import React from 'react';
import { numberFormat } from '../../utils';
import location from '../../assets/user/location.svg';

type Props = {
  name: string;
  amount: number;
  progress: number;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
  color: string;
};

const Index = ({ name, amount, image, price, description, isActive, color }: Props) => {
  return (
    <div className="w-full py-4 ">
      <div className="flex place-content-between">
        <span className={`text-xs font-semibold text-current`}>
          {/* {!isActive && <>{numberFormat.format(amount)} ₮</>} */}
        </span>

        <span className="text-xs font-normal  text-current">{numberFormat.format(price)} ₮</span>
      </div>
      <div className="w-full bg-gray-100  dark:bg-gray-700">
        {amount > price ? (
          <div
            className="rounded-l-md"
            style={{
              border: `1px solid ${color}`,
              borderRight: 'none',
            }}
          >
            <div
              className=" bg-success text-xs font-medium text-blue-100 text-center p-2  rounded-l leading-none "
              style={{
                width: '100%',
                backgroundColor: `${color}`,
              }}
            ></div>
          </div>
        ) : (
          <>
            <div
              className={!isActive && `rounded-l-md`}
              style={{
                border: `1px solid ${color}`,
                borderRight: 'none',
              }}
            >
              <div
                className=" text-xs font-medium  text-center p-2 leading-none rounded-l"
                style={{
                  backgroundColor: !isActive && `${color}`,
                  width: isActive ? '0%' : `${Math.min(100, (Number(amount) / Number(price)) * 100)}%`,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
      <div
        className="relative whitespace-nowrap text-end"
        style={{ width: `${Math.min(100, (Number(amount) / Number(price)) * 100)}%` }}
      >
        <span className={`text-xs font-semibold text-current`}>
          {!isActive && <>{numberFormat.format(amount)} ₮</>}
        </span>
      </div>
    </div>
  );
};

export default Index;
