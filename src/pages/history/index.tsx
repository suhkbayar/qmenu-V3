import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { HistoryCard } from '../../components';
import { ACTIVE_STATES } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { GET_ORDERS } from '../../graphql/query';
import { isEmpty } from 'lodash';
import { AiOutlineInbox } from 'react-icons/ai';
import Loader from '../../components/Loader/Loader';

const OrderHistory = () => {
  const router = useRouter();
  const { participant } = useCallStore();
  const { t } = useTranslation('language');
  const [active, setActive] = useState(true);

  const { loading, data, error } = useQuery(GET_ORDERS);

  if (loading) return <Loader />;

  if (error) {
    router.push(`restaurant?id=${participant.id}`);
    return null;
  }

  const orders = data.getOrders;
  const activeOrders = orders.filter((order) => !ACTIVE_STATES.includes(order.state));
  const unActiveOrders = orders.filter((order) => ACTIVE_STATES.includes(order.state));

  const EmptyOrder = () => (
    <div className="animate-pulse grid place-items-center ">
      <AiOutlineInbox className="text-gray-300 w-20 h-20" />
      <div className="w-full flex place-content-center text-sm text-grayish">{t('mainPage.NoOrderFound')}</div>
    </div>
  );

  const renderOrders = (orderList) =>
    isEmpty(orderList) ? (
      <EmptyOrder />
    ) : (
      orderList.map((item) => <HistoryCard key={item.id} branch={participant.branch} order={item} />)
    );

  return (
    <>
      <div className="relative shadow-lg top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <BiArrowBack onClick={router.back} className="text-xl dark:text-white" />
          <div className="flex w-full place-items-center place-content-center">
            <a className="text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.OrderHistory')}
            </a>
          </div>
        </div>
      </div>
      <div className="p-4">
        <ul className="grid grid-cols-6 flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li onClick={() => setActive(true)} className="mr-2 col-span-3">
            <a
              className={`inline-block w-full px-4 py-3  ${
                active ? ' text-white bg-current ' : ' bg-gray-200 '
              }  rounded-lg`}
              aria-current="page"
            >
              {t('mainPage.ActiveSubscription')}
            </a>
          </li>
          <li onClick={() => setActive(false)} className="mr-2 col-span-3 ">
            <a
              className={`inline-block w-full px-4 py-3  ${
                active ? 'bg-gray-200  ' : ' text-white bg-current '
              }  rounded-lg`}
            >
              {t('mainPage.FulfilledOrders')}
            </a>
          </li>
        </ul>
        <div className="mt-4">{active ? <>{renderOrders(activeOrders)}</> : <>{renderOrders(unActiveOrders)}</>}</div>
      </div>
    </>
  );
};

export default OrderHistory;
