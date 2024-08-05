import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { FiShoppingCart } from 'react-icons/fi';
import { DraftItemsModal, WaiterModal } from '..';
import { WaiterBell } from '../../utils/icons';

const Index = () => {
  const { order, participant, config } = useCallStore();
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
                  style={{
                    background: config?.textColor,
                  }}
                  className=" bg-current shadow cursor-pointer rounded-md p-3 lg:p-4 flex place-content-between animate-quantity-change "
                >
                  <div className="flex place-content-between place-items-center">
                    <FiShoppingCart
                      className="text-white mr-2 lg:text-lg"
                      style={{ color: config.navbarBackgroundColor }}
                    />
                    <div className="text-white text-sm lg:text-lg" style={{ color: config.navbarBackgroundColor }}>
                      ( {order.totalQuantity} ) {t('mainPage.Order')}
                    </div>
                  </div>

                  <div
                    className="text-white font-semibold text-sm lg:text-lg"
                    style={{ color: config.navbarBackgroundColor }}
                  >
                    {order.totalAmount} {CURRENCY}
                  </div>
                </div>
              ) : (
                <div className="pb-11"> </div>
              )}
            </div>
            {participant.channel === 'Q' && (
              <>
                {participant.waiter && (
                  <>
                    <div
                      className="absolute top-1  right-[7.333333%] -mr-1 -mt-1 w-10 h-10 rounded-full bg-current animate-ping"
                      style={{ background: config?.backgroundColor }}
                    ></div>
                    <div
                      onClick={() => showWaiterCall()}
                      className="absolute top-1 right-[7.333333%] z-10 -mr-1 -mt-1 w-10 h-10 rounded-full bg-current "
                      style={{ background: config?.backgroundColor, color: 'red' }}
                    >
                      <div className="flex justify-center mt-[2px]">
                        <WaiterBell color={config.textColor ?? 'white'} />
                      </div>
                    </div>
                  </>
                )}
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
