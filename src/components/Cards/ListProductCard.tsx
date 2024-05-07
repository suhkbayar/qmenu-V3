import React, { useEffect, useState } from 'react';
import { IMenuProduct, IOrderItem } from '../../types';
import { Translate } from 'react-auto-translate';
import { isEmpty } from 'lodash';
import fallback from '../../assets/images/noImage.jpg';
import { CalculateProductPrice, isConfigurable } from '../../tools/calculate';
import { useTranslation } from 'react-i18next';
import { useCallStore } from '../../contexts/call.store';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { MenuItemState } from '../../constants/constant';
import { ProductModal } from '..';

type Props = {
  product: IMenuProduct;
  orderItem: IOrderItem;
};

const Index = ({ product, orderItem }: Props) => {
  const { t } = useTranslation('language');
  const { participant, config } = useCallStore();
  const [visible, setVisible] = useState(false);
  const { add, remove } = useCallStore();
  const [showAnimation, setShowAnimation] = useState(false);

  const onRemove = (item) => {
    remove(item);
  };

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

  const onCloseProduct = () => {
    document.body.style.overflow = 'auto';
    setVisible(false);
  };

  return (
    <>
      <div
        key={product.id}
        className="bg-white grid grid-cols-8 gap-2 relative rounded-xl w-full place-content-between  shadow-lg  dark:bg-gray-700 "
      >
        {product.bonus && (
          <>
            <div className="ribbon-3 "></div>
            <span className="bg-[#87d068] absolute right-0 top-2.5 text-xs text-white pl-1 rounded-l ">
              {product.bonus}
            </span>
          </>
        )}

        {!config ||
          (!config.hideImage && (
            <div className="col-span-3">
              <img
                alt="A scenic landscape"
                onClick={() => setVisible(true)}
                className="rounded-lg w-full object-cover overflow-hidden rounded-tl-xl rounded-bl-xl  h-full "
                src={isEmpty(product.image) ? fallback.src : product.image}
              />
            </div>
          ))}

        <div
          className={` ${
            !config || !config.hideImage ? 'col-span-5' : 'col-span-8  px-2 '
          } w-full h-full grid py-2 content-between`}
        >
          <span className="text-sm flex font-medium  w-full  justify-between ">
            <p className="line-clamp-2 ">
              <Translate>{product.name}</Translate>
            </p>

            {product.bonus && <span className="text-xs text-green-500 w-16 "></span>}
          </span>

          <span className="line-clamp-2 grid text-misty mb-1 content-evenly dark:text-gray-400  leading-3 h-7  text-xs  ">
            <Translate>{product.description}</Translate>
          </span>
          <div className="content-center	">
            <span className="text-sm font-medium text-current gap flex place-items-center">
              <div className="w-full text-xs justify-self-center content-center	">
                {CalculateProductPrice(product.variants)}
              </div>

              {participant?.channel !== 'W' && (
                <>
                  {participant?.orderable && (
                    <>
                      {isConfigurable(product) ? (
                        <div className=" w-full flex place-content-end  h-6 pr-2 place-items-center">
                          <button
                            onClick={() => setVisible(true)}
                            className="flex  font-semibold cursor-pointer place-content-center items-center rounded border border-current w-full text-current  text-xs p-1"
                          >
                            {t('mainPage.Enter')}
                          </button>
                        </div>
                      ) : (
                        <>
                          {orderItem ? (
                            <>
                              <div className="flex items-center  h-6 place-content-center  pr-2">
                                <CiSquareMinus
                                  onClick={() => onRemove(product)}
                                  className="cursor-pointer text-current  text-4xl "
                                />
                                <p
                                  className={`mx-2 text-current  text-center ${
                                    showAnimation ? 'animate-quantity-change' : ''
                                  } `}
                                >
                                  {orderItem.quantity}
                                </p>
                                <CiSquarePlus
                                  onClick={() => onSelect(product.productId)}
                                  className="cursor-pointer text-current  text-4xl "
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className=" w-full flex h-6  place-content-end pr-2 place-items-center">
                                <button
                                  onClick={() => onSelect(product.productId)}
                                  className="flex font-semibold cursor-pointer place-content-center items-center rounded border border-current w-full text-current  text-xs p-1"
                                >
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
            </span>
          </div>
        </div>
      </div>

      {visible && <ProductModal visible={visible} onClose={() => onCloseProduct()} product={product} />}
    </>
  );
};

export default Index;
