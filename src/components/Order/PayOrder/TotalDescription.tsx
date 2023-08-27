import React from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../../constants/currency';
import { IOrder } from '../../../types';
import { numberFormat } from '../../../utils';
import { isEmpty } from 'lodash';

type Props = {
  order: IOrder;
};

const Index = ({ order }: Props) => {
  const { t } = useTranslation('language');

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.SubAmount')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.totalAmount)} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.Tax')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(Math.abs(order.taxAmount + order.vatAmount + order.cityTax))} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2 ml-6">
          <span className="text-misty text-sm "> {t('mainPage.VAT')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.vatAmount)} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2 ml-6">
          <span className="text-misty text-sm "> {t('mainPage.NHT')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.cityTax)} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2 ml-6">
          <span className="text-misty text-sm "> {t('mainPage.NHT')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.cityTax)} {CURRENCY}
          </span>
        </div>

        {!isEmpty(order.charges) && (
          <>
            {order.charges.map((charge, i) => (
              <div key={i} className="flex justify-between mb-2 ml-6">
                <span className="text-misty text-sm "> {charge.name}:</span>
                <span className="text-misty text-sm">
                  {numberFormat.format(charge.amount)} {CURRENCY}
                </span>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.Discount')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.discountAmount)} {CURRENCY}
          </span>
        </div>

        {!isEmpty(order.discounts) && (
          <>
            {order.discounts.map((discount, i) => (
              <div key={i} className="flex justify-between mb-2 ml-6">
                <span className="text-misty text-sm "> {discount.name}:</span>
                <span className="text-misty text-sm">
                  {numberFormat.format(discount.amount)} {CURRENCY}
                </span>
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.Total')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.grandTotal)} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.AmountPaid2')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.paidAmount)} {CURRENCY}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-misty text-sm "> {t('mainPage.AmountPaid')}:</span>

          <span className="text-misty text-sm">
            {numberFormat.format(order.debtAmount)} {CURRENCY}
          </span>
        </div>
      </div>
    </>
  );
};

export default Index;
