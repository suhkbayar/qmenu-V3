import React, { useState, useEffect } from 'react';
import { calculateOrderItem, CalculateProductPrice, isConfigurable } from '../../tools/calculate';
import { IOrderItem } from '../../types';
import { FiShoppingCart } from 'react-icons/fi';
import { useCallStore } from '../../contexts/call.store';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import fallback from '../../assets/images/noImage.jpg';
import { isEmpty } from 'lodash';
import { imageLoader } from '../../tools/image';
import { OptionCard, VariantCard } from '..';
import { generateUUID } from '../../tools/generate';
import { CURRENCY } from '../../constants/currency';
import { Modal } from 'flowbite-react';
import { customThemeModal } from '../../../styles/themes';

type Props = {
  onClose: () => void;
  product: any;
  visible: boolean;
};

const Index = ({ onClose, product, visible }: Props) => {
  const { addOrderItem, addOrderItemOptional, participant } = useCallStore();
  const { t } = useTranslation('language');
  const [selectedItem, setSelectedItem] = useState<IOrderItem>();
  const [visibleValues, setVisibleValues] = useState(false);

  useEffect(() => {
    if (visible) {
      const item: IOrderItem = {
        id: product.variants[0].id,
        uuid: generateUUID(),
        productId: product.productId,
        name: product.variants[0].name,
        reason: '',
        state: 'DRAFT',
        quantity: 1,
        options: [],
        price: product.variants[0].salePrice,
        discount: 0,
        image: '',
      };
      setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
  }, [visible]);

  const onSelect = (variant: any) => {
    if (selectedItem.id === variant.id) {
      setSelectedItem({ ...selectedItem, quantity: selectedItem.quantity + 1 });
    } else {
      const item: IOrderItem = {
        id: variant.id,
        uuid: generateUUID(),
        productId: product.productId,
        name: variant.name,
        reason: '',
        state: 'DRAFT',
        quantity: 1,
        options: [],
        price: variant.salePrice,
        discount: 0,
        image: '',
      };
      setSelectedItem(item);
    }
  };

  const onSelectOption = (option: any) => {
    setSelectedItem((prevSelectedItem) => {
      const isOptionSelected = prevSelectedItem.options.some((selectedOption) => selectedOption.id === option.id);

      if (isOptionSelected) {
        return {
          ...prevSelectedItem,
          options: prevSelectedItem.options.filter((item) => item.id !== option.id),
        };
      }

      const updatedOptions = [...prevSelectedItem.options, option];

      return {
        ...prevSelectedItem,
        options: updatedOptions,
      };
    });
  };

  const onRemove = () => {
    if (selectedItem.quantity > 1) {
      setSelectedItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });
    }
  };

  const addItem = () => {
    if (isConfigurable(product)) {
      addOrderItemOptional(selectedItem);
    } else {
      addOrderItem(selectedItem);
    }
    onClose();
  };

  return (
    <>
      <Modal
        theme={customThemeModal}
        className="w-full p-0"
        position="center"
        dismissible
        show={visible}
        onClose={() => onClose()}
      >
        <div>
          <Modal.Header>
            <span className="text-lg">{t('mainPage.ReadMore')}</span>
          </Modal.Header>
          <Modal.Body>
            <div className="w-full ">
              <div className=" text-center sm:mt-0 sm:ml-4 sm:text-left lg:flex lg:place-content-center">
                <div className=" items-center lg:w-96 flex place-content-center object-cover rounded-md ">
                  {/* <Image
                    src={isEmpty(product.image) ? fallback.src : product.image}
                    alt="stew"
                    loader={imageLoader}
                    width={500}
                    height={1}
                    placeholder="empty"
                    style={{ borderRadius: '10px', width: 'auto', height: 'auto' }}
                    priority={true}
                  /> */}

                  <img
                    width={500}
                    placeholder="empty"
                    className="rounded-lg"
                    src={isEmpty(product.image) ? fallback.src : product.image}
                  />
                </div>
              </div>
              <div className=" flex place-content-between mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="mt-2 items-center flex place-content-center">
                  <p className="text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                    {product.name}
                  </p>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <span className="block text-gray-500 text-sm  ">{CalculateProductPrice(product.variants)}</span>
                </div>
              </div>
              <div className="text-start text-gray1 mt-3" dangerouslySetInnerHTML={{ __html: product.specification }} />

              {participant?.channel !== 'W' && (
                <>
                  {participant?.orderable && (
                    <>
                      <div className="text-start  ml-2 mt-3">
                        <span> {t('mainPage.Variants')}</span>
                      </div>

                      <div
                        className="flex overflow-x-auto snap-x-mandatory mt-3 "
                        style={{ scrollSnapType: 'x mandatory' }}
                      >
                        {product.variants.map((variant) => (
                          <VariantCard
                            onSelect={onSelect}
                            key={variant.id}
                            variant={variant}
                            onRemove={onRemove}
                            selectedItem={selectedItem}
                          />
                        ))}
                      </div>
                      <div className="mt-3  lg:grid lg:place-items-center">
                        {selectedItem &&
                          product.variants
                            .find((variant) => variant.id === selectedItem.id)
                            ?.options?.map((option) => (
                              <OptionCard
                                setVisibleValues={setVisibleValues}
                                visibleValues={visibleValues}
                                onSelect={onSelectOption}
                                isSelected={selectedItem.options.some(
                                  (selectedOption) => selectedOption.id === option.id,
                                )}
                                key={option.id}
                                value={
                                  selectedItem.options.find((selectedOption) => selectedOption.id === option.id)?.value
                                }
                                option={option}
                              />
                            ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </Modal.Body>
        </div>
        {participant?.channel !== 'W' && (
          <>
            {participant?.orderable && (
              <>
                <Modal.Footer>
                  <div className="w-full   flex  justify-between text-sm place-items-center">
                    <span className="block text-current font-semibold ">
                      {calculateOrderItem(selectedItem).toLocaleString()} {CURRENCY}
                    </span>
                    <button
                      onClick={() => addItem()}
                      className="flex font-semibold cursor-pointer place-content-center items-center rounded border border-current h-10 w-32 text-current  text-sm "
                    >
                      <FiShoppingCart className="text-current mr-2" />
                      {t('mainPage.Order')}
                    </button>
                  </div>
                </Modal.Footer>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default Index;
