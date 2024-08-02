import { CURRENCY } from '../constants/currency';
import { IConfig, IOrderItem } from '../types';
import { IMenuProduct, IMenuVariant } from '../types/menu';
import { isEmpty } from 'lodash';

export const CalculateProductPrice = (variants: IMenuVariant[], config?: IConfig) => {
  if (!variants || variants.length === 0) {
    return null; // or return a default component if needed
  }

  const prices: number[] = variants.map((val) => val.salePrice);
  const max: number = Math.max(...prices);
  const min: number = Math.min(...prices);

  if (min === max) {
    return (
      <p className="text-current font-semibold" style={{ color: config?.textColor }}>
        {max.toLocaleString()} {CURRENCY}
      </p>
    );
  } else {
    return (
      <p className="text-current font-semibold" style={{ color: config?.textColor }}>
        {min.toLocaleString()} {CURRENCY} - {max.toLocaleString()} {CURRENCY}
      </p>
    );
  }
};

export const isConfigurable = (product: IMenuProduct): boolean => {
  if (product.variants.length > 1) {
    return true;
  }
  for (const item of product.variants) {
    if (item.options?.length > 0) {
      return true;
    }
  }

  return false;
};

export const calculateOrderItem = (item: IOrderItem) => {
  if (!item) return 0;

  let totalAmount = 0;

  let optionPrices = isEmpty(item.options) ? [] : item.options?.map((option) => option.price);
  const itemTotal = Math.abs((optionPrices?.reduce((a: any, b: any) => a + b, 0) || 0) + item.price) * item.quantity;

  totalAmount += itemTotal;

  return totalAmount;
};
