import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { PromotionCard, RankingCard } from '../../../components';
import { useCallStore } from '../../../contexts/call.store';
import { GET_LOYALTIES_RECORDS } from '../../../graphql/query';
import coupon from '../../../assets/user/coupon.svg';
import voucher from '../../../assets/user/voucher.svg';

const Index = () => {
  const router = useRouter();
  const { participant } = useCallStore();

  const { data } = useQuery(GET_LOYALTIES_RECORDS, { fetchPolicy: 'network-only' });
  const bonus = data?.getLoyaltyRecords.filter((val) => val.type === 'P');

  const promotion = data?.getLoyaltyRecords.find((val) => val.type === 'G');

  let isFirstIteration = true;

  const loyalties = bonus?.map((e) => {
    return { ...e.loyalty };
  });

  const products = participant?.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={() => router.push('/account')} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <a className=" text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              Урамшуулал
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
            <img src={coupon.src} className="h-7 w-7 text-gray-400 mr-2" />
            <span className="text-gray-700 dark:text-white">Бүлгийн урамшуулал</span>
          </div>
        </div>

        <div className="grid gap-2">
          {promotion?.loyalty.configs
            .filter((config) => config.name !== 'TYPE_G')
            .sort((a, b) => {
              const aIndex = JSON.parse(a.value).index;
              const bIndex = JSON.parse(b.value).index;
              return aIndex - bIndex;
            })
            .map((record) => {
              let isActive = false;

              const { image, value, description, color, index } = JSON.parse(record.value);

              if (Number(promotion.amount) < Number(value)) {
                if (isFirstIteration) {
                  isActive = true;
                  isFirstIteration = false;
                }
              }

              return (
                <RankingCard
                  isrounded={true}
                  index={index}
                  key={record.id}
                  name={record.name}
                  progress={promotion.progress}
                  image={image}
                  price={value}
                  color={color}
                  description={description}
                  amount={promotion.amount}
                  isActive={isActive}
                />
              );
            })}
        </div>

        <div
          onClick={() => router.push('/account/basket')}
          className="flex cursor-pointer hover:bg-gainsboro mt-2 rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
        >
          <div className="flex place-content-between">
            <img src={voucher.src} className="h-7 w-7 text-gray-400 mr-2" />
            <span className="text-gray-700 dark:text-white">Бүтээгдэхүүний урамшуулал</span>
          </div>
        </div>
        <div className="flex overflow-x-scroll hide-scroll-bar p-2">
          <div className="flex flex-nowrap gap-2">
            {loyalties?.map((loyalty, index) => {
              return <PromotionCard key={index} products={products} loyaltyId={loyalty.id} configs={loyalty.configs} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
