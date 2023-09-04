import React, { useState } from 'react';
import { RankingMdoal } from '..';
import { numberFormat } from '../../utils';
type Props = {
  isRounded: boolean;
  index: number;
  name: string;
  amount: number;
  configs: any[];
  progress: number;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
  color: string;
};

const Index = ({ index, isRounded, amount, image, price, configs, description, isActive, color, name }: Props) => {
  const [visible, setVisible] = useState(false);
  const onShow = () => {
    setVisible(true);
  };

  return (
    <div className={`w-full pt-8 pb-1`}>
      <div className="flex place-content-between text-center">
        <span style={{ color: color }} className="text-xs relative font-semibold  w-full text-current">
          {numberFormat.format(price)} ₮
          <div style={isRounded ? { left: '-12px' } : {}} className="w-full flex place-content-end">
            <div className={` absolute top-[-5px]  ${index === 4 ? ' right-[0px] ' : 'right-[-1px] '}`}>
              <div
                style={{ borderBottomColor: color, right: `${isRounded && '-3.2%'}` }}
                onClick={() => onShow()}
                className="drop-shape"
              >
                <div
                  style={{ border: `1px solid ${color}` }}
                  onClick={() => onShow()}
                  className="circle flex place-content-center"
                >
                  <img className="rotate-180 w-5" src={image} />
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>

      <div className="w-full   relative  dark:bg-gray-700">
        {amount > price ? (
          <div
            className={`${index === 1 ? 'rounded-l-md' : ''}`}
            style={{
              border: `1px solid #87D068`,
              borderRight: 'none',
            }}
          >
            <div
              className={`bg-success text-xs font-medium text-blue-100 text-center p-2  ${
                index === 1 ? 'rounded-l' : ''
              } leading-none`}
              style={{
                width: '100%',
                backgroundColor: `#87D068`,
              }}
            ></div>
          </div>
        ) : (
          <>
            <div
              className={`bg-gray-100  ${isRounded ? `  'rounded-l-md' ` : `${index === 1 ? 'rounded-l-md' : ''}`} `}
              style={{
                border: `1px solid ${color}`,
                borderRight: `${index !== 4 && 'none'}`,
              }}
            >
              <div
                className={
                  isRounded
                    ? `text-xs font-medium  text-center p-2 leading-none  ${index === 1 ? 'rounded-l' : ''} `
                    : `text-xs font-medium  text-center p-2 leading-none ${index === 1 ? 'rounded-l' : ''}`
                }
                style={{
                  backgroundColor: !isActive ? `${color}` : isRounded && `${color}`,
                  width: `${Math.min(100, (Number(amount) / Number(price)) * 100)}%`,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
      {isRounded && <span className="text-xs mr-16 font-normal">{description}</span>}
      <div
        className="relative whitespace-nowrap text-end"
        style={{ width: `${Math.min(100, (Number(amount) / Number(price)) * 100) + 10}%` }}
      >
        <span style={{ color: color }} className={`text-xs font-semibold relative `}>
          {!isActive && (
            <>
              {!isRounded && numberFormat.format(amount)} {!isRounded && '₮'}
            </>
          )}
        </span>
      </div>
      {visible && (
        <RankingMdoal
          amount={amount}
          price={price}
          visible={visible}
          configs={configs}
          description={description}
          onClose={() => setVisible(false)}
          name={name}
          image={image}
        />
      )}
    </div>
  );
};

export default Index;
