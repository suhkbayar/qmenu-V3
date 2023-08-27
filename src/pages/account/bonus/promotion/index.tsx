import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { GET_LOYALTIES_RECORD } from '../../../../graphql/query';
import { BiArrowBack } from 'react-icons/bi';
import banner from '../../../../assets/card/description.svg';
import { useCallStore } from '../../../../contexts/call.store';
import { IMenuProduct } from '../../../../types';

const Index = () => {
  const router = useRouter();
  const { participant } = useCallStore();

  const { id } = router.query;

  const { data } = useQuery(GET_LOYALTIES_RECORD, { skip: !id, variables: { loyaltyId: id } });

  const products = participant?.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  const producId = data?.getLoyaltyRecord.loyalty.configs
    ?.find((val) => val.name === 'PRODUCT')
    ?.value.replace(/"/g, '');

  const product = products?.find((product) => product.productId === producId);

  const dateResult = data?.getLoyaltyRecord.loyalty.configs?.find((val) => val.name === 'DATE')?.value;
  const orderProduct = data?.getLoyaltyRecord.loyalty.configs?.find((val) => val.name === 'ORDER_PRODUCT')?.value;

  let startDate: string | null = null;
  let endDate: string | null = null;

  let frequency: string | null = null;
  let frequencyProductId: string | null = null;

  let byProduct: IMenuProduct;

  if (orderProduct) {
    const keyValuePairs = orderProduct.slice(1, -1).split(',');

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split(':');
      const trimmedKey = key.trim().replace(/"/g, '');
      const trimmedValue = value.trim().replace(/"/g, '');
      if (trimmedKey === 'frequency') {
        frequency = trimmedValue;
      } else if (trimmedKey === 'product') {
        frequencyProductId = trimmedValue;
      }
    }
  }
  if (frequencyProductId) {
    byProduct = products?.find((product) => product.productId === frequencyProductId);
  }

  if (dateResult) {
    const keyValuePairs = dateResult.slice(1, -1).split(',');

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split(':');
      const trimmedKey = key.trim().replace(/"/g, '');
      const trimmedValue = value.trim().replace(/"/g, '');
      if (trimmedKey === 'startDate') {
        startDate = trimmedValue;
      } else if (trimmedKey === 'endDate') {
        endDate = trimmedValue;
      }
    }
  }

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={() => router.push('/account/bonus')} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Дэлгэрэнгүй
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 flex place-content-center ">
        <div className="w-[342px] max-h-[581px] relative ">
          <img className="w-[342px] h-[581px] left-0 top-0 absolute max-h-[581px] " src={banner.src} />
          <div className="w-[236px] h-[49px] left-[53px] top-[65px] absolute">
            <img className="w-[92px] h-[62.2px] left-[-14px] top-[64px] absolute rounded-lg" src={product?.image} />
            <div className="w-[105px] h-[49px] left-[92px] top-[65px] absolute">
              <div className="w-[142px] h-[59px] flex-col justify-start items-start gap-3 inline-flex place-content-center">
                <div className="text-gray-700 text-base font-medium leading-snug">
                  {frequency} {byProduct && ` ${byProduct.name} + 1`} {product?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="left-[48px] top-[202px] absolute text-center text-black text-base font-bold">
            {data?.getLoyaltyRecord.loyalty.name}
          </div>
          <div className="w-[249px] left-[40px] top-[234px] absolute">
            <span className="text-sm text-misty ">{data?.getLoyaltyRecord.loyalty.description}</span>
          </div>

          <div className="w-full top-[397px] absolute flex px-8 place-content-between">
            <div className="w-full grid gap-[0.5rem] ">
              {startDate && (
                <div className="flex place-content-between ">
                  <span className="text-sm text-gray-700  ">Эхлэх огноо:</span>
                  <span className=" text-sm  text-gray-700 font-medium ">{startDate}</span>
                </div>
              )}

              {endDate && (
                <div className="flex place-content-between ">
                  <span className="text-sm text-gray-700  ">Дуусах огноо:</span>

                  <span className="text-sm text-gray-700  font-medium ">2011.10.10</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
