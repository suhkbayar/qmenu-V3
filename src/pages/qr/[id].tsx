import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import { SystemType, NotificationType } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { emptyOrder } from '../../mock';
import { AuthContext } from '../../providers/auth';
import { useNotificationContext } from '../../providers/notification';
import { SystemTypeByPartner, removePartnerType, setPartnerType } from '../../utils';

const Qr = () => {
  const router = useRouter();
  const { id, token, type: systemType } = router.query as { id?: string; token?: string; type?: SystemType };

  const { authenticate, changeQr } = useContext(AuthContext);
  const { load, setUser } = useCallStore();
  const { showNotification } = useNotificationContext();

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      load(emptyOrder);
      setUser(null);
      authenticate(data.getToken.token, () => router.push(`/restaurant?id=${data.getToken.id}`));
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
      router.push('/notfound');
    },
  });

  React.useEffect(() => {
    if (id) {
      // partner
      console.log('Partner: ', !!token, systemType);
      let systemTypeValue = undefined;

      if (token && systemType) {
        systemTypeValue = SystemTypeByPartner[systemType];
        setPartnerType(systemTypeValue, token);
      } else removePartnerType();

      // banner
      localStorage.setItem('banner', JSON.stringify(true));

      // qr & partner
      changeQr(id.toString());
      getCurrentToken({ variables: { code: id, type: 'Q', token, systemType: systemTypeValue } });
    }
  }, [id]);

  if (loading) return <Loader />;

  return <Loader />;
};

export default Qr;
