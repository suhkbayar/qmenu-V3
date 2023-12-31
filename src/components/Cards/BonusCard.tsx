import React from 'react';
import { CURRENCY } from '../../constants/currency';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { useCallStore } from '../../contexts/call.store';

type Props = {
  item: any;
  image: string;
};

const Index = ({ item, image }: Props) => {
  const { addOrderItem, remove } = useCallStore();

  return (
    <>
      <div className="bg-white flex mb-4 rounded-xl w-full place-content-between drop-shadow-lg  dark:bg-gray-700 ">
        <div className="flex">
          <div className="w-40 place-self-center ">
            <img alt="bonus-card" className="w-40 rounded-lg h-full" src={image} />
          </div>
          <div className="w-40 ml-2 grid p-1 place-content-between">
            <span className="text-base  font-medium line-clamp-2 ">{item.name}</span>

            <span className="text-base font-medium text-current ">
              {item.price.toLocaleString()} {CURRENCY}
            </span>
          </div>
        </div>

        <div className="w-12 place-self-center">
          <div className="grid  items-center place-content-center py-1">
            <CiSquarePlus onClick={() => addOrderItem(item)} className="cursor-pointer text-current w-9 h-9" />
            <p className="mx-2 text-current animate-quantity-change  text-center">{item.quantity}</p>
            <CiSquareMinus onClick={() => remove(item)} className="cursor-pointer text-current w-9 h-9" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
