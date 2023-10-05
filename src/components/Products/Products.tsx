import React from 'react';
import { IMenuProduct } from '../../types/menu';
import { isEmpty } from 'lodash';
import { SmartBanner, ProductCard } from '..';
import { useCallStore } from '../../contexts/call.store';
import { BannerType } from '../../types';

type Props = {
  products: IMenuProduct[];
};

const Index = ({ products }: Props) => {
  const { order } = useCallStore();
  if (isEmpty(products)) return <SmartBanner types={[BannerType.M, BannerType.E]} empty />;

  const renderItems = () => {
    let result: any = products ? [...products] : [];

    if (result.length <= 4) {
      result.push([BannerType.E, BannerType.M]);
    } else {
      result.splice(4, 0, [BannerType.M]);
      result.push([BannerType.E]);
    }

    return result;
  };

  return (
    <>
      <div className=" card-body items-center place-content-center">
        <div className=" text-gray-900 font-sans ">
          <div className="flex flex-wrap">
            {renderItems().map((product) => {
              if (typeof product === 'object' && product.length > 0)
                return <SmartBanner types={product as BannerType[]} />;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  orderItem={order?.items?.find((item) => item.productId === product.productId)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
