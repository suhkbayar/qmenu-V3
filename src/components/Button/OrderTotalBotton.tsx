import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { FiShoppingCart } from 'react-icons/fi';
import waiter from '../../assets/icons/waiter-icon.png';
import { DraftItemsModal, WaiterModal } from '..';

const Index = () => {
  const { order, participant } = useCallStore();
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);
  const [isCall, setIsCall] = useState(false);

  const showDraft = () => {
    setVisible(true);
  };

  const showWaiterCall = () => {
    setIsCall(true);
  };

  return (
    <>
      <div className=" pb-4 pl-2 ">
        <div className="w-[95%]  ">
          <div className="flex gap-2 lg:place-content-center">
            <div className="w-5/6 lg:w-1/2">
              {order && order.totalQuantity > 0 ? (
                <div
                  onClick={() => showDraft()}
                  className=" bg-current shadow cursor-pointer rounded-md p-3 lg:p-4 flex place-content-between animate-quantity-change "
                >
                  <div className="flex place-content-between place-items-center">
                    <FiShoppingCart className="text-white mr-2 lg:text-lg" />
                    <div className="text-white text-sm lg:text-lg">
                      ( {order.totalQuantity} ) {t('mainPage.Order')}
                    </div>
                  </div>

                  <div className="text-white font-semibold text-sm lg:text-lg">
                    {order.totalAmount} {CURRENCY}
                  </div>
                </div>
              ) : (
                <div className="pb-11"> </div>
              )}
            </div>
            {participant.channel === 'Q' && (
              <>
                <div className="absolute top-1  right-[7.333333%] -mr-1 -mt-1 w-10 h-10 rounded-full bg-current animate-ping"></div>
                <div
                  onClick={() => showWaiterCall()}
                  className="absolute top-1 right-[7.333333%] z-10 -mr-1 -mt-1 w-10 h-10 rounded-full bg-current "
                >
                  <img src={waiter.src} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <DraftItemsModal visible={visible} onClose={() => setVisible(false)} />
      {isCall && <WaiterModal visible={isCall} onClose={() => setIsCall(false)} />}
    </>
  );
};

export default Index;
