import React, { useState } from 'react';
import { numberFormat } from '../../utils'; // Make sure the correct path is used
import RankingModal from '../Modal/RankingModal';

type Props = {
  isRounded: boolean; // Use camelCase for prop names
  index: number;
  name: string;
  amount: number;
  configs: any[]; // Replace 'any' with a more specific type if possible
  progress: number;
  price: number;
  image: string;
  description: string;
  isActive: boolean;
  color: string;
};

const Index: React.FC<Props> = ({
  isRounded,
  index,
  amount,
  image,
  price,
  configs,
  description,
  isActive,
  color,
  name,
}: Props) => {
  const [visible, setVisible] = useState(false);

  const onShow = () => {
    setVisible(true);
  };

  const progressBarWidth = isRounded ? '100%' : `${Math.min(100, (amount / price) * 100)}%`;

  return (
    <div className="w-full pt-8 pb-1">
      <div className="flex justify-between text-center">
        <span style={{ color }} className="text-xs font-semibold w-full text-current">
          {numberFormat.format(price)} ₮
        </span>
      </div>
      <div className="w-full relative dark:bg-gray-700">
        <div style={isRounded ? { left: '-12px' } : {}} className="relative">
          <div style={{ borderBottomColor: color }} onClick={() => onShow()} className="drop-shape">
            <div style={{ backgroundColor: color }} onClick={() => onShow()} className="circle">
              <img className="bagde" src={image} />
            </div>
          </div>
        </div>
        {amount > price ? (
          <div
            className={`bg-success text-xs font-medium text-blue-100 text-center p-2 ${
              index === 1 ? 'rounded-l-md' : ''
            }`}
            style={{ border: `1px solid #87D068`, borderRight: 'none', backgroundColor: `#87D068` }}
          />
        ) : (
          <div
            className={`bg-gray-100 ${isRounded ? 'rounded-l-md' : index === 1 ? 'rounded-l-md' : ''}`}
            style={{ border: `1px solid ${color}`, borderRight: index !== 3 ? 'none' : '' }}
          >
            <div
              className={`text-xs font-medium text-center p-2 leading-none ${
                isRounded || index === 1 ? 'rounded-l' : ''
              }`}
              style={{
                backgroundColor: !isActive ? color : isRounded && color,
                width: progressBarWidth,
              }}
            />
          </div>
        )}
      </div>
      {isRounded && <span className="text-xs mr-16 font-normal">{description}</span>}
      <div className="relative whitespace-nowrap text-end" style={{ width: progressBarWidth }}>
        <span style={{ color }} className="text-xs font-semibold">
          {!isActive && !isRounded && <>{numberFormat.format(amount)} ₮</>}
        </span>
      </div>
      {visible && (
        <RankingModal
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
