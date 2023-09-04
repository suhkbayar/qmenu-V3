import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../../../components/Loader/Loader';
import { JobApplication } from '../../../components';
import { NotificationType } from '../../../constants/constant';
import { useNotificationContext } from '../../../providers/notification';
import { GET_FORM } from '../../../graphql/query';
import { FILL_FORM } from '../../../graphql/mutation/form';

const Index = () => {
  const router = useRouter();
  const { showNotification } = useNotificationContext();

  const { t } = useTranslation('language');
  const [name, setName] = useState();
  const [structure, setStructure] = useState<any>();

  const { data, loading, error } = useQuery(GET_FORM, {
    onCompleted(data) {
      if (data) {
        const formStructure = data?.getFormStructures?.find((e) => e?.type === 'JA');
        if (formStructure) {
          setName(formStructure.name);
          setStructure(JSON.parse(formStructure.structure));
        }
      }
    },
  });

  const [fillForm] = useMutation(FILL_FORM, {
    onCompleted: (data) => {
      router.back();
      showNotification(NotificationType.SUCCESS, t('mainPage.SignupSuccess'));
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  if (loading) return <Loader />;

  if (error) return router.push('/account');

  const onFinish = (values: any) => {
    fillForm({ variables: { id: data.getFormStructures[0].id, value: JSON.stringify(values) } });
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
              Ажлын анкет
            </a>
          </div>
        </div>
      </div>
      {structure ? (
        <JobApplication onSubmit={(values) => onFinish(values)} structure={structure} />
      ) : (
        <div className="w-full flex align-center justify-center ">Одоогоор анкет байхгүй байна</div>
      )}
    </>
  );
};

export default Index;
