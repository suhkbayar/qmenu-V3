import { useMutation } from '@apollo/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { CURRENT_TOKEN } from '../graphql/mutation/token';
import MainHeader from '../layouts/Header/mainHeader';
import Content from '../layouts/Content/mainContent';
import { isValidToken, setAccessToken } from '../providers/auth';
import Footer from '../layouts/footer';
import Features from '../layouts/feutures';
import Loader from '../components/Loader/Loader';
import { getPartnerType } from '../utils';
import { SystemType } from '../constants/constant';

const Home: NextPage = () => {
  const router = useRouter();
  const { token, type: systemType } = router.query as { id?: string; token?: string; type?: SystemType };
  const isValid = isValidToken();

  const [currentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted(data) {
      setAccessToken(data.getToken.token);
    },
    onError: (err) => {
      router.push('/notfound');
    },
  });

  const fetchToken = useCallback(async () => {
    let partner = { token: undefined, systemType: undefined };

    partner.token = token ?? getPartnerType()?.token;
    partner.systemType = systemType ?? getPartnerType()?.systemType;

    await currentToken({ variables: { code: '', type: 'W', ...partner } });
  }, []);

  useEffect(() => {
    if (!isValid) {
      fetchToken();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <MainHeader />
      <Content />
      <Features />
      <Footer />
    </>
  );
};

export default Home;
