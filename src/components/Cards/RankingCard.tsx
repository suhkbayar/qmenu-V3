import React, { useState } from 'react';
import { RankingMdoal } from '..';
import { numberFormat } from '../../utils';
type Props = {
  isrounded: boolean;
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

const Index = ({ index, isrounded, amount, image, price, configs, description, isActive, color, name }: Props) => {
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };

  return (
    <div className="w-full pt-8 pb-1 ">
      <div className="flex place-content-between text-center">
        <span style={{ color: color }} className="text-xs  font-semibold  w-full text-current">
          {numberFormat.format(price)} ₮
        </span>
      </div>
      <div className="w-full bg-gray-100 relative  dark:bg-gray-700">
        <div style={isrounded ? { left: '-12px' } : {}} className="relative">
          <div style={{ borderBottomColor: color }} onClick={() => onShow()} className="drop-shape">
            <div style={{ backgroundColor: color }} onClick={() => onShow()} className="circle">
              <img className="bagde" src={image} />
            </div>
          </div>
        </div>
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
              className={isrounded ? `rounded-l-md` : ''}
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
                  backgroundColor: !isActive ? `${color}` : isrounded && `${color}`,
                  width: isrounded ? '100%' : `${Math.min(100, (Number(amount) / Number(price)) * 100)}%`,
                }}
              ></div>
            </div>
          </>
        )}
      </div>
      {isrounded && <span className="text-xs mr-16 font-normal">{description}</span>}
      <div
        className="relative whitespace-nowrap text-end"
        style={{ width: `${Math.min(100, (Number(amount) / Number(price)) * 100) + 10}%` }}
      >
        <span style={{ color: color }} className={`text-xs font-semibold `}>
          {!isActive && (
            <>
              {!isrounded && numberFormat.format(amount)} {!isrounded && '₮'}
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
