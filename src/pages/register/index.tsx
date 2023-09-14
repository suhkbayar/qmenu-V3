import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { ConfirmationForm, LoginCarousel, PhoneForm, UserRegistrationForm } from '../../components';
import { useCallStore } from '../../contexts/call.store';
import { GET_SESSION } from '../../graphql/mutation/register';
import { SIGN_UP } from '../../graphql/mutation/sign';
import { AuthContext } from '../../providers/auth';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';
import { GET_LOYALTIES_RECORDS, GET_ORDERS, ME } from '../../graphql/query';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Index = () => {
  const router = useRouter();
  const { participant, setUser } = useCallStore();
  const { authenticate } = useContext(AuthContext);
  const { showNotification } = useNotificationContext();
  const [formStep, setFormStep] = useState(0);
  const { t } = useTranslation('language');
  const [getSessionId, setSessionId] = useState();

  const [phone, setPhone] = useState();
  const goBack = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  const [getSession] = useMutation(GET_SESSION, {
    onCompleted: (data) => {
      setSessionId(data.getSession);
      setFormStep(1);
    },
    onError(err) {
      setFormStep(0);
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  const [getLoyaltiesRecords, { refetch: refetchLoyalties }] = useLazyQuery(GET_LOYALTIES_RECORDS);
  const [getMe, { data, refetch: refetchMe }] = useLazyQuery(ME, {
    onCompleted: (data) => {
      setUser(data.me);
    },
  });
  const [getOrder, { refetch }] = useLazyQuery(GET_ORDERS);

  const onSuccess = async () => {
    await refetchLoyalties();
    await refetch();
    await refetchMe();
    showNotification(NotificationType.SUCCESS, t('mainPage.LoginSuccess'));
    goBack();
  };

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      authenticate(data.signUp.token, () => {
        onSuccess();
      });
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  const onSubmit = (data: any) => {
    setPhone(data.phoneNumber);
    setFormStep(1);
    getSession({ variables: { phone: data.phoneNumber, type: 'R' } });
  };

  const onRegister = (data: any) => {
    signUp({
      variables: {
        input: {
          email: '',
          gender: capitalizeFirstLetter(data.gender),
          name: data.firstName,
          password: data.password,
          phone: phone,
          session: getSessionId,
          year: data.year,
        },
      },
    });
  };

  const onError = (text: string) => {
    showNotification(NotificationType.WARNING, text);
  };

  const tryCode = () => {
    getSession({ variables: { phone: phone, type: 'R' } });
  };
  const goSigin = () => {
    router.push('/signin');
  };

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={goBack} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.UserRegistration')}
            </a>
          </div>
        </div>
      </div>
      <div className="login-body flex md:grid grid-cols-6 ">
        <div className="  md:col-span-4  place-self-center">
          <div className="hidden h-[40rem] md:flex  w-[31rem] ">
            <LoginCarousel />
          </div>
        </div>
        <div className=" w-full md:flex md:place-items-center col-span-2 md:h-full ">
          <div className="w-full xl:w-96">
            {formStep === 0 && <PhoneForm onSubmit={(data) => onSubmit(data)} goBack={goSigin} />}
            {formStep === 1 && (
              <ConfirmationForm
                tryCode={tryCode}
                start
                sessionId={getSessionId}
                phone={phone}
                goBack={() => setFormStep(0)}
                setFormStep={setFormStep}
                onError={onError}
              />
            )}
            {formStep === 2 && <UserRegistrationForm onSubmit={(data) => onRegister(data)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
