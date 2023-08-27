import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormData = {
  password: string;
  passwordRepeat: string;
};

type Props = {
  onSubmit: (formData: FormData) => void;
};

const Index = ({ onSubmit }: Props) => {
  const { t } = useTranslation('language');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch('password');

  return (
    <>
      <form className=" w-full grid  place-items-center  py-5 px-8" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal text-sm font-bold py-2 dark:text-white" htmlFor="password">
            {t('mainPage.UserPassword')}
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            id="password"
            inputMode="numeric"
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.EnterPassword')}</span>
          )}
        </div>

        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal text-sm font-bold py-2 dark:text-white" htmlFor="passwordRepeat">
            {t('mainPage.RepeatUserPassword')}
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            id="passwordRepeat"
            inputMode="numeric"
            type="password"
            {...register('passwordRepeat', {
              required: true,
              validate: (value) => value === password || t('mainPage.PasswordDoesNotMatch'),
            })}
          />
          {errors.passwordRepeat && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.PasswordDoesNotMatch')}</span>
          )}
          <div className="pt-4 pb-2  w-full ">
            <button
              type="submit"
              className="w-full   rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300"
            >
              {t('mainPage.register')}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Index;
