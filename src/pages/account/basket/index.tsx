import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import coupon from '../../../assets/user/coupon.svg';
import { VoucherCard, Empty } from '../../../components';
import voucher from '../../../assets/user/voucher.svg';
import { GET_CUSTOMER_PRODUCTS } from '../../../graphql/query';

const Index = () => {
  const router = useRouter();

  const { data } = useQuery(GET_CUSTOMER_PRODUCTS, { fetchPolicy: 'network-only' });

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={() => router.back()} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Миний сагс
            </a>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div
          onClick={() => router.push('/account/basket')}
          className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
        >
          <div className="flex place-content-between">
            <img src={voucher.src} className="h-7 w-7 text-gray-400 mr-2" />
            <span className="text-gray-700 dark:text-white">Ваучер</span>
          </div>
        </div>

        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 place-items-center  place-content-center">
          {data?.getCustomerProducts
            .filter((customerProduct) => customerProduct.state === 'ACTIVE')
            .map((val, index) => (
              <VoucherCard key={index} product={val.product} expiredAt={val.expiredAt} id={val.id} />
            ))}
          {data?.getCustomerProducts.filter((customerProduct) => customerProduct.state === 'ACTIVE').length === 0 && (
            <Empty />
          )}
        </div>

        <div
          onClick={() => router.push('/account/basket')}
          className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
        >
          <div className="flex place-content-between">
            <img src={coupon.src} className="h-7 w-7 text-gray-400 mr-2" />
            <span className="text-gray-700 dark:text-white">Coupon</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
