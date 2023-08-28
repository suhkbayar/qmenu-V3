import React from 'react';
import { IMenuProduct } from '../../types/menu';
import banner from '../../assets/card/promoitonBanner.svg';
import { numberFormat } from '../../utils';
import { useRouter } from 'next/router';

type Props = {
  configs: any[];
  products: IMenuProduct[];
  loyaltyId: string;
};

const Index = ({ configs, loyaltyId, products }: Props) => {
  const router = useRouter();
  const producId = configs?.find((val) => val.name === 'PRODUCT')?.value.replace(/"/g, '');
  const product = products?.find((product) => product.productId === producId);

  if (!product) return null;
  const orderProduct = configs?.find((val) => val.name === 'ORDER_PRODUCT')?.value;

  let frequency: string | null = null;
  let frequencyProductId: string | null = null;

  let byProduct: IMenuProduct;

  if (orderProduct) {
    const keyValuePairs = orderProduct.slice(1, -1).split(',');

    for (const pair of keyValuePairs) {
      const [key, value] = pair.split(':');
      const trimmedKey = key.trim().replace(/"/g, '');
      const trimmedValue = value.trim().replace(/"/g, '');
      if (trimmedKey === 'frequency') {
        frequency = trimmedValue;
      } else if (trimmedKey === 'product') {
        frequencyProductId = trimmedValue;
      }
    }
  }

  if (frequencyProductId) {
    byProduct = products?.find((product) => product.productId === frequencyProductId);
  }

  const goDescription = () => {
    router.push(`/account/bonus/promotion?id=${loyaltyId}`);
  };

  return (
    <>
      <div className="w-[241px] h-[330px] relative">
        <img className="w-[241px] h-[329.55px] left-0 top-0 absolute " src={banner.src} />
        <img
          className="w-[241px] h-[161.14px] left-0 top-0 absolute rounded-tl-xl rounded-tr-xl"
          src={product?.image}
        />
        <div className=" w-full text-center top-[159.57px] absolute text-gray-700 text-sm font-medium leading-snug">
          <span className=" flex items-center place-content-center line-clamp-2 leading-1 h-[39px] px-4 ">
            {frequency} {byProduct && ` ${byProduct.name} + 1`} {product?.name}
          </span>
        </div>
        <div
          onClick={() => goDescription()}
          className="w-[180px] px-3 py-2 left-[32px] top-[249px] cursor-pointer absolute bg-orange-500 rounded-md justify-center items-center gap-2.5 inline-flex"
        >
          <div className="text-center text-white text-xs font-medium">Дэлгэрэнгүй</div>
        </div>
        <div className="left-[32px] top-[214.5px] absolute justify-start items-start gap-1 inline-flex">
          <div className="text-orange-500 text-sm font-medium leading-snug">
            {numberFormat.format(product?.variants.find((variant) => variant.id === product.id)?.salePrice)} ₮
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
