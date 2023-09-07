import React from 'react';
import { Modal } from 'flowbite-react';
import { customThemeWaiterModal } from '../../../styles/themes';
import { ConvertBankImg } from '../../tools/convertImg';
import { PAYMENT_TYPE } from '../../constants/constant';
import { PinInput } from '..';
import { CgSpinner } from 'react-icons/cg';
import { renderCardNumber } from '../Forms/PaymentForms/Upoint';
import { BsCreditCard2Back } from 'react-icons/bs';
import { useLoyaltyContext } from '../../contexts/loyalty.context';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  id: string;
  onClose: () => void;
  onSubmit: (e: string) => void;
};

const Index = ({ visible, onClose, onSubmit }: Props) => {
  const { t } = useTranslation('language');

  const { upointBalance, setUpointBalance, upointLoadingBalance, upointStep } = useLoyaltyContext();

  const onChoose = (state: 'balance' | 'spend' | 'collect') => {
    setUpointBalance({ ...upointBalance, state });
    onClose();
  };

  const renderBody = [
    <Modal.Body className="p-1" key={0}>
      <div className="flex flex-col justify-center items-center p-2">
        <img className="w-20 rounded-lg" src={ConvertBankImg(PAYMENT_TYPE.UPT)} alt={`${PAYMENT_TYPE.UPT} Bank`} />
        <p>{t('mainPage.EnterPinCode')}</p>
      </div>
    </Modal.Body>,
    <Modal.Body className="p-2 px-8" key={2}>
      <div className="flex flex-col justify-center items-center p-2">
        <img className="w-20 rounded-lg" src={ConvertBankImg(PAYMENT_TYPE.UPT)} alt={`${PAYMENT_TYPE.UPT} Bank`} />
      </div>
      <div className="flex items-center border-b border-gray-300 py-2">
        <div className="flex flex-col">
          <span className="text-sm text-misty font-bold">{upointBalance?.phone}</span>
          <div className="flex flex-no-wrap whitespace-nowrap items-center justify-start gap-1 text-misty text-xs">
            {renderCardNumber(upointBalance?.code)}
            <BsCreditCard2Back />
          </div>
        </div>
        <div className="flex flex-col whitespace-nowrap justify-center items-end ml-auto">
          <span className="text-xs">{t('mainPage.Point')}</span>
          <span className="text-base text-current">{upointBalance?.balance}</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-2 pb-0">
        <p className="my-1">{t('mainPage.AvailablePoints')}</p>
        <p className="text-6xl text-current">{upointBalance?.state === 'collect' ? '--' : upointBalance?.balance}</p>
      </div>
    </Modal.Body>,
  ];

  const renderFooter = [
    <Modal.Footer key={1} className="flex justify-center py-11 relative">
      {upointLoadingBalance && <CgSpinner className="absolute inset-x-0 mx-auto text-2xl animate-spin" />}
      <PinInput className="gap-3" onSubmit={onSubmit} loading={upointLoadingBalance} />
    </Modal.Footer>,
    <Modal.Footer className="flex gap-5 mt-3 justify-center p-4" key={4}>
      <span
        onClick={() => onChoose('spend')}
        style={{ width: '100px' }}
        className={`flex justify-center items-center p-2 h-9 rounded-lg border  ${
          upointBalance?.state === 'spend'
            ? 'bg-lightapricot text-current border-current'
            : 'bg-gainsboro text-misty border-grayish'
        } `}
      >
        {t('mainPage.ToSpend')}
      </span>
      <span
        className={`flex justify-center items-center p-2 h-9 rounded-lg border  ${
          upointBalance?.state === 'collect'
            ? 'bg-lightapricot text-current border-current'
            : 'bg-gainsboro text-misty border-grayish'
        } `}
        style={{ width: '100px' }}
        onClick={() => onChoose('collect')}
      >
        {t('mainPage.ToCollect')}
      </span>
    </Modal.Footer>,
  ];

  return (
    <Modal show={visible} dismissible theme={customThemeWaiterModal} onClose={() => onClose()}>
      {renderBody[upointStep]}
      {renderFooter[upointStep]}
    </Modal>
  );
};

export default Index;
