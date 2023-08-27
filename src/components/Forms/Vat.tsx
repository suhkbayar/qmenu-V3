import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PATTERN_COMPANY_REGISTER } from '../../constants/pattern';
import { GET_VAT_PAYER } from '../../graphql/query/vat';
import { isEmpty } from 'lodash';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';

type Props = {
  register: any;
  errors: any;
  setValue: any;
  reset: any;
};

const Index = ({ register, errors, setValue, reset }: Props) => {
  const { t } = useTranslation('language');

  const [vatType, setVatType] = useState<string>('1');
  const [buyer, setBuyer] = useState<string>();
  const [buyerRegister, setBuyerRegister] = useState<string>();
  const { showNotification } = useNotificationContext();

  register('vatType', { required: true, value: vatType });
  register('register', { required: vatType === '3', value: buyerRegister, patterm: PATTERN_COMPANY_REGISTER });
  register('buyer', { required: vatType === '3', value: buyer });

  const [getVatPayer, { loading, error, data }] = useLazyQuery(GET_VAT_PAYER, {
    onCompleted(data) {
      setBuyer(data.getVatPayer.name);
      setValue('buyer', data.getVatPayer.name);
      if (!data.getVatPayer.found) {
        reset({
          buyer: null,
        });
        setBuyer(null);
      }
    },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);
    },
  });

  const onSelect = (vatValue: any) => {
    setVatType(vatValue);
    setValue('vatType', vatValue);
  };

  const onRegister = (value: any) => {
    if (value.length >= 7) {
      setValue('register', value);
      setBuyerRegister(value);
      getVatPayer({ variables: { register: value } });
    } else if (value.length <= 7) {
      reset({
        buyer: null,
      });
      setBuyer(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <div className="text-sm text-misty ">{t('mainPage.VATreceipt')}</div>

        <div className="flex gap-3 mt-2">
          <span
            className={`inline-grid text-center p-2  w-full rounded-lg border  ${
              vatType === '1' ? 'bg-lightapricot text-current border-current' : 'bg-gainsboro text-misty border-grayish'
            } `}
            onClick={() => onSelect('1')}
          >
            {t('mainPage.Individual')}
          </span>
          <span
            onClick={() => onSelect('3')}
            className={`inline-grid text-center p-2  w-full rounded-lg border  ${
              vatType === '3' ? 'bg-lightapricot text-current border-current' : 'bg-gainsboro text-misty border-grayish'
            } `}
          >
            {t('mainPage.Institution')}
          </span>
        </div>

        {vatType === '3' && (
          <>
            <div className={` ${loading ? 'opacity-20' : ''} `}>
              <div className="inline-grid w-full  ">
                <label
                  className="text-gray-700 font-normal text-sm  text-misty font-bold py-2 dark:text-white"
                  htmlFor=""
                >
                  {t('mainPage.OrganizationalRegisters')}
                </label>
                <input
                  disabled={loading}
                  onChange={(e) => onRegister(e.target.value)}
                  className="px-4 py-2 text-gray-800 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                  type="text"
                />
                {errors.register && (
                  <span className="text-xs pt-1 text-red-500 dark:text-white">Регистерийн дугаар буруу байна!</span>
                )}
              </div>

              <div className="inline-grid w-full ">
                <label
                  className="text-gray-700 font-normal text-sm  text-misty font-bold py-2 dark:text-white"
                  htmlFor=""
                >
                  {t('mainPage.CompanyName')}
                </label>
                <input
                  className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                  type="text"
                  disabled
                  value={isEmpty(buyer) ? '' : buyer}
                  {...register('buyer', { required: true })}
                />
                {errors.buyer && (
                  <span className="text-xs pt-1 text-red-500 dark:text-white"> Байгууллагын нэр буруу байна!</span>
                )}
              </div>
            </div>
            {loading && (
              <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-[44%] left-1/2">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-current"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Index;
