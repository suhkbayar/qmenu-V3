import React, { useContext } from 'react';
import { Button, Notfound } from '../../components';
// import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../providers/auth';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';
import { getPartnerType } from '../../utils';

const NotFoundPage: React.FC = () => {
  // const { t } = useTranslation();
  const { signOut, authenticate } = useContext(AuthContext);
  const { showNotification } = useNotificationContext();
  const router = useRouter();

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      authenticate(data.getToken.token, () => router.replace('/signin'));
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
      // router.push('/notfound');
    },
  });

  return (
    <div className="relative w-full h-screen">
      <Notfound title="Ширээг урьдчилан захиалсан байна." text="" />
      {!getPartnerType() && (
        <Button
          loading={loading}
          className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 h-10 w-max"
          onClick={() => {
            const code = localStorage.getItem('qr');
            signOut();

            getCurrentToken({ variables: { code, type: 'Q' } });
          }}
          // text={t('mainPage.Signout')}
          text="Гарах"
        />
      )}
    </div>
  );
};

export default NotFoundPage;
