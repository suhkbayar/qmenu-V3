import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { PATTERN_PHONE } from '../../constants/pattern';

type FormData = {
  phoneNumber: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  goBack: () => void;
};

const Index = ({ onSubmit, goBack }: Props) => {
  const { t } = useTranslation('language');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <>
      <form className=" w-full grid  place-items-center  py-5 px-8" action="" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="text-sm w-full pt-4 pb-2  text-gray1 dark:text-white text-start">
          <span> {t('mainPage.VerificationCodePhone')}</span>
        </div>
        <div className="pt-2 pb-2  w-full ">
          <button
            type="submit"
            className="w-full   rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300"
          >
            {t('mainPage.ToBeContinued')}
          </button>
          <div className="w-full pt-4">
            <button
              onClick={() => goBack()}
              className="w-full rounded-lg  px-4 py-2  md: px-5 py-3    bg-white border border-current text-current hover:bg-white duration-300"
            >
              {t('mainPage.GoBack')}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Index;
