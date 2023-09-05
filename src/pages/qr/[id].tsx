import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import { NotificationType } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { emptyOrder } from '../../mock';
import { AuthContext } from '../../providers/auth';
import { useNotificationContext } from '../../providers/notification';

const Qr = () => {
  const router = useRouter();
  const { id } = router.query;

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
      // router.push('/notfound');
    },
  });

  React.useEffect(() => {
    if (id) {
      changeQr(id.toString());
      getCurrentToken({ variables: { code: id, type: 'Q' } });
    }
  }, [id]);

  if (loading) return <Loader />;

  return <Loader />;
};

export default Qr;
