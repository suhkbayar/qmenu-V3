import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/client';
import { isValidToken, setAccessToken } from '../../providers/auth';
import { useCallStore } from '../../contexts/call.store';
import { GET_BRANCH } from '../../graphql/query/branch';
import Loader from '../../components/Loader/Loader';
import { Banner, BlockContent, BottomNavigation, Header, ListContent, PreOrderModal } from '../../components';
import { Languages } from '../../constants/constantLang';
import { useTranslation } from 'react-i18next';
import { GOOGLE_CLOUD_KEY } from '../../constants/constanApi';
import Footer from '../../layouts/footer';
import { isEmpty } from 'lodash';
import { emptyOrder } from '../../mock';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { getPartnerType } from '../../utils';
import { CHECK_TABLE } from '../../graphql/query';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';
import { IOrder } from '../../types';
import { usePreOrderStore } from '../../contexts/preorder.store';
import { TranslateProvider } from '../../providers/TranslateProvider';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const isValid = isValidToken();
  const { showNotification } = useNotificationContext();
  const [visible, setVisible] = useState<boolean>(false);
  const { load: loadPreOrders } = usePreOrderStore();

  const [checkTable, { loading: loadCheckTable }] = useLazyQuery(CHECK_TABLE);

  const { setParticipant, participant, order, load, config } = useCallStore();
  const { i18n } = useTranslation('language');

  const [currentToken] = useMutation(CURRENT_TOKEN, {
    onCompleted(data) {
      setAccessToken(data.getToken.token);
      router.reload();
    },
    onError: (err) => {
      router.push('/notfound');
    },
  });

  const [getBranch, { loading, data }] = useLazyQuery(GET_BRANCH, {
    onCompleted(data) {
      setParticipant(data.getParticipant);
      if (data.getParticipant.orderable && isEmpty(order)) {
        load(emptyOrder);
      }
    },
    onError(err) {
      if (isValid) {
        router.push('/notfound');
      } else {
        const partner = getPartnerType();

        currentToken({ variables: { code: '', type: 'W', ...(partner ?? {}) } });
      }
    },
  });

  useEffect(() => {
    checkTable({
      variables: { code: localStorage.getItem('qr') },
      onCompleted({ checkTable }: { checkTable: IOrder[] }) {
        if (checkTable.length > 0) {
          const order = checkTable[0];

          const currentDate = new Date();
          const orderStartDate = new Date(order.startAt);
          const orderEndDate = new Date(order.startAt);
          orderEndDate.setMinutes(orderEndDate.getMinutes() + order.duration);

          if (orderStartDate <= currentDate && orderEndDate >= currentDate) setVisible(true);
          else {
            loadPreOrders(checkTable);
            router.push('/restaurant/notyet');
          }
        } else loadPreOrders([]);
      },
      onError({ graphQLErrors }) {
        graphQLErrors.forEach((element: any) => {
          switch (element.errorType) {
            case 'OR0010': {
              showNotification(NotificationType.INFO, element.message);
              router.push('/signin');
              break;
            }
            case 'OR0011': {
              router.push('/restaurant/tableordered');
              break;
            }
          }
        });
      },
    });

    if (id) {
      getBranch({ variables: { id: id } });
    }
  }, [id]);

  if (loading || loadCheckTable) return <Loader />;

  return (
    <>
      {data && participant && (
        <TranslateProvider
          googleApiKey={GOOGLE_CLOUD_KEY}
          defaultLanguage="mn"
          language={
            Languages.find((item) => i18n.language.includes(item.name.toLowerCase()))?.name.toLowerCase() || 'en'
          }
        >
          <Header />
          <Banner branch={data.getParticipant.branch} />
          {config ? config.menuTheme === 'list' ? <ListContent /> : <BlockContent /> : <BlockContent />}
          <Footer branch={data.getParticipant.branch} />
          <BottomNavigation />
        </TranslateProvider>
      )}
      <PreOrderModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
};

export default Index;
