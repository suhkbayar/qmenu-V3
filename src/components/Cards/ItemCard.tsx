import React from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';

type Props = {
  item: any;
  image: string;
};

const Index = ({ item, image }: Props) => {
  const { t } = useTranslation('language');
  return (
    <>
      <div className="bg-white flex mb-4 rounded-xl w-full place-content-between drop-shadow-lg  dark:bg-gray-700 ">
        <div className="flex gap-2">
          <div className="w-28 place-self-center ">
            <img alt="image " className="w-28 rounded-lg h-full" src={image} />
          </div>
          <div className="grid place-content-around">
            <span className="text-sm  font-medium line-clamp-2 ">{item.name} </span>
            <span className="text-xs font-medium text-current ">
              {item.quantity} x {item.price.toLocaleString()} {CURRENCY}
            </span>
            <span className="text-sm font-medium text-current">{t(`mainPage.${item.state}`)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
