import React, { useState } from 'react';
import banner from '../../assets/card/voucherBanner.svg';
import dashed from '../../assets/card/voucherDashed.svg';
import { IMenuProduct } from '../../types/menu';
import date from '../../assets/card/date.svg';
import check from '../../assets/card/Check.png';

type Props = {
  product: IMenuProduct;
  expiredAt: any;
  id: string;
  selectedId: string;
  onSelect: (id: string) => void;
};

const Index = ({ product, expiredAt, id, selectedId, onSelect }: Props) => {
  return (
    <>
      <div
        onClick={() => onSelect(id)}
        className="w-[342px] h-[104px] relative transform transition duration-100 hover:scale-[1.01] cursor-pointer "
      >
        <img className="w-[342px] h-[104px] left-0 top-[0.42px] absolute  " src={banner.src} />
        <div className="w-10 h-10 left-[50px] top-[31.97px] absolute">
          <div className="w-[39.81px] h-[39.88px] left-[-0px] top-[-0px] absolute">
            <img className=" absolute left-[71px] top-[-24px]" src={dashed.src} />
          </div>
        </div>
        <div className="w-[158px] h-[4.75rem] left-[140px] top-[16.97px] absolute grid place-items-start">
          <div className=" w-full text-gray-700 text-base font-medium leading-snug">{product.name}</div>

          <div className=" w-full text-zinc-600 text-xs font-medium">{product.description}</div>
          {expiredAt && (
            <div className="flex gap-2">
              <img className="w-4 h-4 relative" src={date.src} />
              <div className="text-gray-400 text-xs font-normal">2023/08/31 хүртэл</div>
            </div>
          )}
        </div>
        {selectedId && selectedId === id && <img className="absolute right-[19px] top-[9px]" src={check.src} />}
        <img className="w-[87.27px] h-[74.67px] left-[29px] top-[12.42px] absolute rounded-md" src={product.image} />
      </div>
    </>
  );
};

export default Index;
