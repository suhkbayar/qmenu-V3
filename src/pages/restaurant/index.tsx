import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useMutation } from '@apollo/client';
import { isValidToken, setAccessToken } from '../../providers/auth';
import { useCallStore } from '../../contexts/call.store';
import { GET_BRANCH } from '../../graphql/query/branch';
import Loader from '../../components/Loader/Loader';
import { Banner, BlockContent, BottomNavigation, Header, ListContent } from '../../components';
import { Languages } from '../../constants/constantLang';
import { useTranslation } from 'react-i18next';
import { GOOGLE_CLOUD_KEY } from '../../constants/constanApi';
import { isEmpty } from 'lodash';
import { emptyOrder } from '../../mock';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { TranslateProvider } from '../../providers/TranslateProvider';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const isValid = isValidToken();

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
        currentToken({ variables: { code: '', type: 'W' } });
      }
    },
  });

  useEffect(() => {
    if (id) {
      getBranch({ variables: { id: id } });
    }
  }, [id]);

  if (loading) return <Loader />;

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
          <BottomNavigation />
        </TranslateProvider>
      )}
    </>
  );
};

export default Index;
