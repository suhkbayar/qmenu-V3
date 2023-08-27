import React, { useEffect } from 'react';
import { numberFormat } from '../../utils';
import location from '../../assets/user/location.svg';
type Props = {
  isrounded: boolean;
  index: number;
  name: string;
  amount: number;
  progress: number;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
  color: string;
};

const Index = ({ index, name, isrounded, amount, image, price, description, isActive, color }: Props) => {
  useEffect(() => {
    if (index === 1) isrounded = true;
  }, []);
  return (
    <div className="w-full pt-8 pb-1 ">
      <div className="flex place-content-between">
        <span className={`text-xs font-semibold text-current`}>
          {/* {!isActive && <>{numberFormat.format(amount)} ₮</>} */}
        </span>

        <span className="text-xs mr-16 font-normal  text-current">{numberFormat.format(price)} ₮</span>
      </div>

      <div className="w-full bg-gray-100 relative  dark:bg-gray-700">
        <div style={isrounded ? { left: '-12px' } : {}} className="relative">
          <div style={{ borderBottomColor: color }} className="drop-shape">
            <div style={{ backgroundColor: color }} className="circle">
              <img className="bagde" src={image} />
            </div>
          </div>
        </div>

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
              className={isrounded && `rounded-l-md`}
              style={{
                border: `1px solid ${color}`,
                borderRight: `${index !== 3 && 'none'}`,
              }}
            >
              <div
                className={
                  isrounded
                    ? 'text-xs font-medium  text-center p-2 leading-none rounded-l-md'
                    : 'text-xs font-medium  text-center p-2 leading-none '
                }
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
