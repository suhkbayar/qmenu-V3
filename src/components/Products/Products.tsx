import React from 'react';
import { IMenuProduct } from '../../types/menu';
import { isEmpty } from 'lodash';
import { Empty, ProductCard } from '..';
import { useCallStore } from '../../contexts/call.store';

type Props = {
  products: IMenuProduct[];
};

const Index = ({ products }: Props) => {
  const { order } = useCallStore();
  if (isEmpty(products)) return <Empty />;

  return (
    <>
      <div className=" card-body items-center place-content-center">
        <div className=" text-gray-900 font-sans ">
          <div className="flex flex-wrap">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                orderItem={order.items.find((item) => item.productId === product.productId)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
