import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import coupon from '../../../assets/user/coupon.svg';
import { VoucherCard, Empty } from '../../../components';
import voucher from '../../../assets/user/voucher.svg';
import { GET_CUSTOMER_PRODUCTS } from '../../../graphql/query';
import { isEmpty } from 'lodash';

const Index = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data } = useQuery(GET_CUSTOMER_PRODUCTS, { fetchPolicy: 'network-only' });

  const onSelect = (selectedId: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(selectedId)) {
        return prevSelectedIds.filter((id) => id !== selectedId);
      } else {
        return [...prevSelectedIds, selectedId];
      }
    });
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
            .filter((customerProduct) => customerProduct.state === 'READY')
            .map((val, index) => (
              <VoucherCard
                onSelect={onSelect}
                selectedId={selectedIds.includes(val.id) ? val.id : null}
                key={index}
                product={val.product}
                expiredAt={val.expiredAt}
                id={val.id}
              />
            ))}
          {data?.getCustomerProducts.filter((customerProduct) => customerProduct.state === 'READY').length === 0 && (
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
      <div className="w-full flex place-content-center">
        <div className=" fixed cursor-pointer bottom-0 sm:bottom-0 transition-all duration-500  md:bottom-5 lg:bottom-5 w-full   sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12">
          <div className="bg-white pl-4 pr-4 pt-7 pb-2 rounded-t-lg">
            <button
              type="submit"
              className={`w-full flex place-content-center place-items-center rounded-lg px-4 py-3  ${
                isEmpty(selectedIds) ? 'bg-gray-300 border border-misty' : 'bg-current text-white hover:bg-current'
              }   duration-300`}
            >
              Идэвхжүүлэх
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
