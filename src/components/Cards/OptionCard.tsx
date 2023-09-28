import React from 'react';
import { CURRENCY } from '../../constants/currency';
import check from '../../assets/order/Check.png';
import unCheck from '../../assets/order/UnCheck.png';
import { OptionValuesModal } from '..';
import { isEmpty } from 'lodash';

type Props = {
  option: any;
  onSelect: (option: any) => void;
  value: string;
  isSelected: boolean;
  visibleValues: boolean;
  setVisibleValues: (visibleValues: boolean) => void;
};

const Index = ({ option, onSelect, isSelected, value, setVisibleValues, visibleValues }: Props) => {
  const onSelectOption = (option: any) => {
    if (!isEmpty(option.values) && isEmpty(value)) {
      return setVisibleValues(true);
    }

    onSelect(option);
  };

  const onSelectValue = (value: any) => {
    onSelect({ ...option, value: value });
    setVisibleValues(false);
  };

  return (
    <>
      <div
        onClick={() => onSelectOption(option)}
        className={`w-full flex place-content-between p-2 border rounded-lg mb-2 lg:w-2/3    hover:shadow-md hover:border-current ${
          isSelected ? 'border-current' : ''
        }  `}
      >
        <div className="flex">
          <img
            alt="check-img"
            src={isSelected ? check.src : unCheck.src}
            className="place-self-center mr-2 animate-quantity-change"
            width={15}
            style={{ height: 15 }}
          />

          <span className="line-clamp-2  font-normal text-misty text-sm">{option.name}</span>
        </div>
        <span className="text-current text-sm">{value}</span>
        <span className="font-semibold text-current text-sm">
          {option.price.toLocaleString()} {CURRENCY}
        </span>
      </div>
      {visibleValues && option.values && (
        <OptionValuesModal
          visible={visibleValues}
          values={option.values}
          onSelectValue={onSelectValue}
          onClose={() => setVisibleValues(false)}
        />
      )}
    </>
  );
};

export default Index;
