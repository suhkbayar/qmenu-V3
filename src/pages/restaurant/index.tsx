import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { isValidToken } from '../../providers/auth';
import { useCallStore } from '../../contexts/call.store';
import { GET_BRANCH } from '../../graphql/query/branch';
import Loader from '../../components/Loader/Loader';
import { Banner, BottomNavigation, Header, RestaurantContent } from '../../components';
import { cacheProvider } from '../../contexts/translate.context';
import { Languages } from '../../constants/constantLang';
import { useTranslation } from 'react-i18next';
import { GOOGLE_CLOUD_KEY } from '../../constants/constanApi';
import Footer from '../../layouts/footer';
import { isEmpty } from 'lodash';
import { Translator } from 'react-auto-translate';
import { emptyOrder } from '../../mock';

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const isValid = isValidToken();

  const { setParticipant, participant, order, load } = useCallStore();
  const { i18n } = useTranslation('language');

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
        <>
          <Translator
            cacheProvider={cacheProvider}
            from="mn"
            to={Languages.find((item) => i18n.language.includes(item.name.toLowerCase())).name.toLowerCase()}
            googleApiKey={GOOGLE_CLOUD_KEY}
          >
            <Header />
            <Banner branch={data.getParticipant.branch} />
            <RestaurantContent />
            <Footer branch={data.getParticipant.branch} />
            <BottomNavigation />
          </Translator>
        </>
      )}
    </>
  );
};

export default Index;
