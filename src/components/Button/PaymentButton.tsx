import React from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { numberFormat } from '../../utils';
import { isEmpty } from 'lodash';
import { SystemType } from '../../constants/constant';

type Props = {
  loading: boolean;
  grandTotal: any;
  paymentType: string;
  showCashier: () => void;
  partner?: SystemType;
};

const Index = ({ loading, grandTotal, paymentType, showCashier, partner }: Props) => {
  const { t } = useTranslation('language');

  const { participant } = useCallStore();

  return (
    <>
      <div className=" fixed cursor-pointer bottom-0 sm:bottom-0 transition-all duration-500  md:bottom-5 lg:bottom-5 w-full   sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12">
        <div className="bg-white pl-4 pr-4 pt-4 pb-2 rounded-t-lg dark:bg-gray-800">
          {!participant.advancePayment && !partner && (
            <div
              onClick={() => showCashier()}
              className="w-full mb-3 flex place-content-center  place-items-center border border-current rounded-lg px-4 py-3 bg-white dark:bg-gray-600"
            >
              <span className="text-current">{t('mainPage.PayAtTheBoxOffice')}</span>
            </div>
          )}
          <button
            disabled={loading || isEmpty(paymentType)}
            type="submit"
            className={`w-full flex place-content-between place-items-center border rounded-lg px-4 py-3 ${
              isEmpty(paymentType)
                ? 'bg-gainsboro  border-grayish text-misty '
                : 'bg-current   hover:bg-current  text-white border-current'
            }   duration-300`}
          >
            {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
            <span>{t('mainPage.Payment')}</span>
            <span
              className={`p-1 rounded-lg text-sm ${
                isEmpty(paymentType) ? 'bg-gainsboro text-misty ' : 'bg-coral text-white '
              } font-semibold `}
            >
              {numberFormat.format(grandTotal)} {CURRENCY}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Index;
