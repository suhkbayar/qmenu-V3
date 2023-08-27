import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PROFILE } from '../../../graphql/mutation/register';
import { ME } from '../../../graphql/query/user';
import Loader from '../../../components/Loader/Loader';
import { UpdateForm } from '../../../components';
import { ICustomer } from '../../../types/customer';
import { NotificationType } from '../../../constants/constant';
import { useNotificationContext } from '../../../providers/notification';

const Index = () => {
  const router = useRouter();

  const { t } = useTranslation('language');
  const { showNotification } = useNotificationContext();

  const { data, loading } = useQuery(ME);

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    update(cache, { data: { updateProfile } }) {
      const caches = cache.readQuery<{ me: ICustomer }>({ query: ME });
      if (caches && caches.me) {
        cache.writeQuery({
          query: ME,
          data: {
            me: caches.me.id === updateProfile.id ? updateProfile : caches.me,
          },
        });
      }
    },
    onCompleted: (data) => {
      router.back();
      showNotification(NotificationType.SUCCESS, t('mainPage.SignupSuccess'));
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  if (loading) return <Loader />;

  const onFinish = (values) => {
    updateProfile({ variables: { input: { ...values } } });
  };

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={() => router.back()} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.CustomerInformation')}
            </a>
          </div>
        </div>
      </div>
      {data && <UpdateForm loading={loading} onSubmit={(values) => onFinish(values)} user={data.me} />}
    </>
  );
};

export default Index;
