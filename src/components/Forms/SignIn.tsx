import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useLazyQuery } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutation/sign';
import { AuthContext } from '../../providers/auth';
import { PATTERN_PHONE } from '../../constants/pattern';
import { Button } from '..';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';
import { GET_LOYALTIES_RECORDS, GET_ORDERS, ME } from '../../graphql/query';
import { useCallStore } from '../../contexts/call.store';

type FormData = {
  phoneNumber: string;
  password: string;
};

type Props = {
  goBack: () => void;
};

const Index = ({ goBack }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const { showNotification } = useNotificationContext();
  const { authenticate } = useContext(AuthContext);
  const { setUser } = useCallStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      authenticate(data.signIn.token, () => {
        onSuccess();
      });
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  const onSubmit = (data: FormData) => {
    signIn({ variables: { phone: data.phoneNumber, password: data.password } });
  };

  const goPasswordRecovery = () => {
    router.push('/password-recovery');
  };

  const goRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <form className=" w-full grid  place-items-center pb-1 py-5 px-8" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="inline-grid w-full ">
          <label className="text-gray-700 font-normal font-bold py-2 dark:text-white" htmlFor="">
            {t('mainPage.PhoneNumber')}
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            autoFocus
            inputMode="numeric"
            type="text"
            {...register('phoneNumber', { required: true, pattern: PATTERN_PHONE })}
          />
          {errors.phoneNumber && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.PleaseEnterPhoneNumber')}</span>
          )}
        </div>
        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal font-bold py-2 dark:text-white " htmlFor="">
            {t('mainPage.Password')}
          </label>
          <input
            className="px-4 pt-2 pb-2.5 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-xs pt-1 text-red-500 dark:text-white"> {t('mainPage.EnterPassword')} </span>
          )}
        </div>
        <div className="text-sm w-full pt-4 pb-2  text-current text-end">
          <span onClick={() => goPasswordRecovery()} className="cursor-pointer">
            {t('mainPage.ForgotPassword')}
          </span>
        </div>
        <div className="pt-2 pb-2  w-full ">
          <Button loading={loading} text={t('mainPage.login')} />
        </div>
      </form>
      <div className="w-full pt-2 py-5 px-8">
        <button
          onClick={goRegister}
          className="w-full rounded-lg  px-4 py-2  md: px-5 py-3    bg-white border border-current text-current hover:bg-white duration-300"
        >
          {t('mainPage.register')}
        </button>
      </div>
    </>
  );
};

export default Index;
