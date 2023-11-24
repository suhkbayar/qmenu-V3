import React, { useEffect, useState } from 'react';
import { IMenuProduct } from '../../types/menu';
import fallback from '../../assets/images/noImage.jpg';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { CalculateProductPrice, isConfigurable } from '../../tools/calculate';
import { FiShoppingCart } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { MenuItemState } from '../../constants/constant';
import { useCallStore } from '../../contexts/call.store';
import { IOrderItem } from '../../types';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { ProductModal } from '..';
import { Translate } from 'react-auto-translate';

type Props = {
  product: IMenuProduct;
  orderItem: IOrderItem;
};

const Index = ({ product, orderItem }: Props) => {
  const { t } = useTranslation('language');
  const { participant } = useCallStore();

  const [visible, setVisible] = useState(false);
  const { add, remove } = useCallStore();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    const timeout = setTimeout(() => {
      setShowAnimation(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, [orderItem?.quantity]);

  const onSelect = (productId: string) => {
    if (product?.state !== MenuItemState.ACTIVE) return;
    if (!product || product.variants.length === 0) return;

    if (product.variants.length > 1) {
      setVisible(true);
    } else {
      product.variants.forEach((item) => {
        if (item.options?.length > 0) {
          setVisible(true);
        } else {
          add(product.variants[0], productId);
        }
      });
    }
  };

  const onRemove = (item) => {
    remove(item);
  };

  const onCloseProduct = () => {
    document.body.style.overflow = 'auto';
    setVisible(false);
  };

  return (
    <>
      <div key={product.id} className=" w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/4 p-2 ">
        <div className=" relative hover:shadow-xl  shadow-lg bg-white  dark:bg-gray-700 rounded-md ">
          {product.bonus && <div className="ribbon-2">{product.bonus}</div>}
          <div className="relative object-cover rounded-md " onClick={() => setVisible(true)}>
            <Image
              alt="product"
              src={isEmpty(product.image) ? fallback.src : product.image}
              width={500}
              height={600}
              className="rounded-lg"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="m-4  mb-0">
            <h2 className="line-clamp-2 h-9 leading-4 font-bold  dark:text-gray-400 text-sm text-misty">
              <Translate>{product.name}</Translate>
            </h2>
            <span className="line-clamp-2 text-misty mb-1 dark:text-gray-400  leading-3 h-7 text-gray-500 text-sm  ">
              <Translate>{product.description}</Translate>
            </span>
            <span className="block text-gray-500 text-sm h-7 leading-3 ">
              {CalculateProductPrice(product.variants)}
            </span>
          </div>
          {participant?.channel !== 'W' && (
            <>
              {participant?.orderable && (
                <>
                  {isConfigurable(product) ? (
                    <div className="pb-2 ml-2 mr-2">
                      <div className="border-b my-2"></div>
                      <button
                        onClick={() => setVisible(true)}
                        className="flex font-semibold cursor-pointer place-content-center items-center rounded border border-current w-full text-current  text-sm p-1"
                      >
                        <FiShoppingCart className="text-current mr-2" />
                        {t('mainPage.Enter')}
                      </button>
                    </div>
                  ) : (
                    <>
                      {orderItem ? (
                        <>
                          <div className="border-b my-2 mb-0"></div>
                          <div className="flex items-center place-content-center py-1">
                            <CiSquareMinus
                              onClick={() => onRemove(product)}
                              className="cursor-pointer text-current w-10 h-10"
                            />
                            <p className={`mx-2 text-current ${showAnimation ? 'animate-quantity-change' : ''} `}>
                              {orderItem.quantity}
                            </p>
                            <CiSquarePlus
                              onClick={() => onSelect(product.productId)}
                              className="cursor-pointer text-current w-10 h-10"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pb-2 ml-2 mr-2">
                            <div className="border-b my-2"></div>
                            <button
                              onClick={() => onSelect(product.productId)}
                              className="flex font-semibold cursor-pointer place-content-center items-center rounded border border-current w-full text-current  text-sm p-1"
                            >
                              <FiShoppingCart className="text-current mr-2" />
                              {t('mainPage.Order')}
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {visible && <ProductModal visible={visible} onClose={() => onCloseProduct()} product={product} />}
    </>
  );
};

export default Index;
