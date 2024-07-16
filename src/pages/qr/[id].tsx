import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import { NotificationType } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { emptyOrder } from '../../mock';
import { AuthContext } from '../../providers/auth';
import { useNotificationContext } from '../../providers/notification';
import { CHECK_TABLE } from '../../graphql/query';

const Qr = () => {
  const router = useRouter();
  const { id } = router.query;

  const { authenticate, changeQr } = useContext(AuthContext);
  const { load, setUser } = useCallStore();
  const { showNotification } = useNotificationContext();
  const [checkTable, { loading: checking }] = useLazyQuery(CHECK_TABLE);

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      load(emptyOrder);
      setUser(null);
      authenticate(data.getToken.token, () =>
        checkTable({
          variables: { code: id },
          onCompleted() {
            router.push(`/restaurant?id=${data.getToken.id}`);
          },
          onError(err) {
            router.push('/register');
          },
        }),
      );
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
      router.push('/notfound');
    },
  });

  React.useEffect(() => {
    if (id) {
      localStorage.setItem('banner', JSON.stringify(true));
      changeQr(id.toString());
      getCurrentToken({ variables: { code: id, type: 'Q' } });
    }
  }, [id]);

  if (loading || checking) return <Loader />;

  return <Loader />;
};

export default Qr;
