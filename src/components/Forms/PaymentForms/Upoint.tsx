import React, { useState } from 'react';
import checkImage from './img/Check.png';
import { ConvertBankImg } from '../../../tools/convertImg';
import { NotificationType, PAYMENT_TYPE } from '../../../constants/constant';
import { BsCreditCard2Back } from 'react-icons/bs';
import { IOrder, IPayment, ITransaction } from '../../../types';
import { IUser } from '../../../types/user';
import { UpointModal } from '../..';
import { useLoyaltyContext } from '../../../contexts/loyalty.context';
import { useTranslation } from 'react-i18next';
import { useNotificationContext } from '../../../providers/notification';

type Props = {
  user: IUser;
  payment: IPayment;
  order: IOrder;
};

const Index: React.FC<Props> = ({ user, payment, order }) => {
  const [visible, setVisible] = useState(false);
  const { getUpointBalance, upointBalance, setUpointBalance } = useLoyaltyContext();
  const { t } = useTranslation('language');

  const { showNotification } = useNotificationContext();

  const onSubmitPin = (pin_code: any) => {
    const input = {
      mobile: user.phone,
      pin_code,
      order: order.id,
      payment: payment.id,
      card_number: '',
      verify: true,
    };
    getUpointBalance({
      variables: { input },
      onError: (error: Error) => showNotification(NotificationType.ERROR, error.message),
    });
  };

  const showModal = () => {
    if (!order?.transactions.find((item: ITransaction) => item.state === 'PAID' && item.type === PAYMENT_TYPE.UPT)) {
      if (upointBalance && upointBalance.state !== 'balance') {
        setUpointBalance({ ...upointBalance, state: 'balance' });
      } else {
        setVisible(true);
      }
    } else {
      showNotification(NotificationType.WARNING, t('mainPage.LoyaltyAlreadyAccepted'));
    }
  };

  const renderChoosedText = () => {
    if (upointBalance.state === 'balance') {
      return t('mainPage.AvailablePoints');
    } else if (upointBalance.state === 'collect') {
      return t('mainPage.ToCollect');
    } else {
      return t('mainPage.ToSpend');
    }
  };

  if (!payment?.id) return <></>;

  return (
    <>
      <div
        onClick={showModal}
        className={`w-full bg-white rounded-lg p-1 mt-4 relative ${
          ['spend', 'collect'].includes(upointBalance?.state) ? 'border-2 border-current' : ''
        }`}
      >
        {['spend', 'collect'].includes(upointBalance?.state) && (
          <img className="absolute mt-0 ml-0 w-4" src={checkImage.src} alt="Checkmark" />
        )}
        <div className="flex justify-start gap-1 items-center px-1">
          <div className="rounded-lg flex place-self-center">
            <img
              className={`w-13 rounded-lg`}
              src={ConvertBankImg(PAYMENT_TYPE.UPT)}
              alt={`${PAYMENT_TYPE.UPT} Bank`}
            />
          </div>
          {upointBalance ? (
            <>
              <div className="flex flex-col">
                <span className="text-sm">U-Point</span>
                <div className="flex flex-no-wrap whitespace-nowrap items-center justify-start gap-1 text-misty text-xs">
                  {renderCardNumber(upointBalance.code)}
                  <BsCreditCard2Back />
                </div>
              </div>
              <div className="flex flex-col whitespace-nowrap justify-center items-end ml-auto">
                <span className="text-xs">{renderChoosedText()}</span>
                {upointBalance.state !== 'collect' && (
                  <span className="text-base text-current">{upointBalance.balance}</span>
                )}
              </div>
            </>
          ) : (
            <span className="text-misty text-base">U-Point</span>
          )}
        </div>
      </div>
      {visible && (
        <UpointModal id={order?.id || ''} visible={visible} onClose={() => setVisible(false)} onSubmit={onSubmitPin} />
      )}
    </>
  );
};

export default Index;

export const renderCardNumber = (e: string) => {
  let str = e ? e : '';
  let arr: string[] = str.replace(/\s/g, '').match(/.{1,4}/g) ?? [];
  if (arr.length === 4) {
    let lastItem = arr[arr.length - 1].split('');
    const sym = lastItem.map((_) => '*');
    arr = arr.map((val, i) => (i === arr.length - 1 ? sym.join('') : val));
  }
  return arr.join(' ');
};
