import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { IoMdFemale, IoMdMale } from 'react-icons/io';
import { getMonths } from '../../mock';
import { isEmpty } from 'lodash';

type FormData = {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  year: number;
  gender: string;
  password: string;
  passwordRepeat: string;
  month: string;
  day: string;
};

interface KeyValuePair {
  key: any;
  label: any;
}

type Props = {
  onSubmit: (formData: FormData) => void;
};

const Index = ({ onSubmit }: Props) => {
  const { t } = useTranslation('language');
  const [gender, setGender] = useState('Female');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({ defaultValues: { gender: gender } });

  const getYears = () => {
    let d = new Date();
    let y = d.getFullYear();

    const times: KeyValuePair[] = [];
    for (let i = 0; i < 60; i++) {
      times.push({ key: i, label: y-- });
    }
    return times;
  };

  const getDays = (month: string) => {
    const days = [];
    const totalDays = new Date(new Date().getFullYear(), parseInt(month, 10), 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push({ key: i, label: i });
    }
    return days;
  };

  let Days = getDays(watch('month'));

  const Years = getYears();

  useEffect(() => {
    setValue('day', '');
    Days = getDays(watch('month'));
  }, [watch('month')]);

  const onGenders = (gender) => {
    setGender(gender);
    setValue('gender', gender);
  };

  const password = watch('password');
  const month = watch('month');

  return (
    <>
      <form className=" w-full grid  place-items-center  py-5 px-8" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="inline-grid w-full ">
          <label className="text-gray-700 font-normal text-sm  font-bold py-2 dark:text-white" htmlFor="">
            Овог
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            autoFocus
            type="text"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.PleaseEnterName')}</span>
          )}
        </div>
        <div className="inline-grid w-full ">
          <label className="text-gray-700 font-normal text-sm  font-bold py-2 dark:text-white" htmlFor="">
            Нэр
          </label>
          <input
            className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
            type="text"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.PleaseEnterName')}</span>
          )}
        </div>

        <div className="inline-grid w-full">
          <label className="text-gray-700 font-normal  text-sm font-bold py-2 dark:text-white" htmlFor="">
            Төрсөн он
          </label>
          <div className="flex items-center justify-between flex flex-row gap-2 ">
            <div className="inline-grid w-full basis-1/2 ">
              <select
                className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                {...register('year', { required: true })}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Он
                </option>
                {Years.map((year) => (
                  <option key={year.key} value={year.label}>
                    {year.label}
                  </option>
                ))}
              </select>
              {errors.year && (
                <span className=" text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.EnterTheYearOfBirth')}</span>
              )}
            </div>

            <div className="inline-grid w-full basis-1/4 ">
              <select
                className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                {...register('month', { required: true })}
                defaultValue=""
              >
                <option disabled hidden value="">
                  Сар
                </option>
                {getMonths.map((month) => (
                  <option key={month.key} value={month.label}>
                    {month.label}
                  </option>
                ))}
              </select>
              {errors.month && (
                <span className=" text-center text-xs pt-1 text-red-500 dark:text-white">Төрсөн сар оруулна уу.</span>
              )}
            </div>

            <div className="inline-grid w-full basis-1/4 ">
              <select
                className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                {...register('day', { required: true })}
                disabled={isEmpty(month)}
                defaultValue=""
              >
                <option disabled hidden value="">
                  Өдөр
                </option>
                {Days.map((year) => (
                  <option key={year.key} value={year.label}>
                    {year.label}
                  </option>
                ))}
              </select>
              {errors.day && (
                <span className="text-center text-xs pt-1 text-red-500 dark:text-white">Төрсөн өдөр оруулна уу.</span>
              )}
            </div>
          </div>
        </div>

        <div className="inline-grid w-full ">
          <label className="text-gray-700 font-normal py-2 text-sm font-bold  dark:text-white" htmlFor="">
            Хүйс
          </label>
          <div className="flex items-center justify-between grid grid-cols-3 gap-2 ">
            <div
              onClick={() => onGenders('Female')}
              className={` p-2 cursor-pointer flex gap-1 place-items-center rounded-lg ${
                gender === 'Female'
                  ? 'bg-lightapricot  border border-current text-current'
                  : 'bg-gainsboro  border border-grayish text-gray-700'
              } text-center place-content-center`}
            >
              <IoMdFemale className="text-lg" />
              <input
                {...register('gender', { required: true })}
                type="radio"
                name="gender"
                value="Female"
                id="Female"
              />
              {t('mainPage.Woman')}
            </div>

            <div
              onClick={() => onGenders('Male')}
              className={` p-2 cursor-pointer flex gap-1 place-items-center rounded-lg ${
                gender === 'Male'
                  ? 'bg-lightapricot  border border-current text-current'
                  : 'bg-gainsboro  border border-grayish text-gray-700'
              } text-center place-content-center`}
            >
              <IoMdMale className="text-lg" />
              <input
                {...register('gender', { required: true })}
                type="radio"
                name="gender"
                value="Male"
                className="form-check-input "
                id="Male"
              />
              {t('mainPage.Male')}
            </div>

            <div
              onClick={() => onGenders('Custom')}
              className={` p-2 cursor-pointer rounded-lg ${
                gender === 'Custom'
                  ? 'bg-lightapricot  border border-current text-current'
                  : 'bg-gainsboro  border border-grayish text-gray-700'
              } text-center place-content-center`}
            >
              <input
                {...register('gender', { required: true })}
                type="radio"
                name="gender"
                value="Custom"
                className="form-check-input"
                id="Custom"
              />
              {t('mainPage.Other')}
            </div>
          </div>

          {errors.gender && (
            <span className="text-xs pt-1 text-red-500 dark:text-white">{t('mainPage.EnterYourGender')}</span>
          )}
        </div>

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
        </div>
        <div className="pt-4 pb-2  w-full ">
          <button
            type="submit"
            className="w-full   rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300"
          >
            {t('mainPage.register')}
          </button>
        </div>
      </form>
    </>
  );
};

export default Index;
