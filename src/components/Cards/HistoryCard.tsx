import React from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useNotificationContext } from '../../providers/notification';
import { ConvertOrderType } from '../../tools/convertImg';
import { IBranch } from '../../types';
import { IOrder } from '../../types/order';
import { IoReceiptOutline } from 'react-icons/io5';

type Props = {
  branch: IBranch;
  order: IOrder;
};

const Index = ({ branch, order }: Props) => {
  const { t } = useTranslation('language');

  const { showOrderNotification } = useNotificationContext();

  return (
    <div
      onClick={() => showOrderNotification(order.id)}
      className="bg-white cursor-pointer p-3 mb-4 rounded-xl w-full place-content-between drop-shadow-lg  dark:bg-gray-700 "
    >
      <div className="grid grid grid-cols-6 gap-2">
        <div className="col-span-1 flex place-content-center">
          <img src={branch.logo} className="w-20  rounded-lg" />
        </div>

        <div className="col-span-5 place-content-around">
          <span className=" ">{branch.name} </span>
          <div className="flex gap-1">
            <div className="text-xs text-misty   ">{t('mainPage.OrderNumber')}:</div>
            <div className="text-xs text-current text-center  "> {order?.number.slice(-4)}</div>
          </div>
        </div>
        <div className=" absolute top-1.5 right-2 text-xs text-misty">{order.date}</div>
      </div>
      <div className="w-full ">
        <div className="border-b my-2"></div>
        <div className="grid  grid-cols-6 gap-2">
          <div className="col-span-1 flex place-content-center">
            <img src={ConvertOrderType(order.type)} className="w-10 h-10  rounded-lg" />
          </div>
          <div className=" grid grid-cols-4  col-span-5">
            {order.paymentState === 'PAID' ? (
              <>
                <div className="col-span-2 text-start  content-between grid">
                  <span className="text-xs text-misty"> {t('mainPage.Total')}: </span>
                  <span className=" flex gap-2 place-self-start">
                    <span className="text-sm">
                      {order.grandTotal.toLocaleString()} {CURRENCY}
                    </span>
                    <span className="text-xs text-misty">( {order.items.length}ш )</span>
                  </span>
                </div>
                <div className="col-span-2 text-start  content-between grid">
                  <IoReceiptOutline className="w-6 h-6" />
                </div>
              </>
            ) : (
              <>
                <div className="col-span-2 grid content-between ">
                  <span className="text-xs text-misty"> {t('mainPage.OrderStatus2')}: </span>
                  <span className="text-xs text-misty ">{t(`mainPage.${order.state}`)}</span>
                </div>
                <div className="col-span-2 text-end  content-between grid">
                  <span className="text-xs text-misty"> {t('mainPage.Total')}: </span>
                  <span className=" flex gap-2 place-self-end">
                    <span className="text-sm">
                      {order.grandTotal.toLocaleString()} {CURRENCY}
                    </span>
                    <span className="text-xs text-misty">( {order.items.length}ш )</span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
