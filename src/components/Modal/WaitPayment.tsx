import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import pending from '../../assets/images/Bubble.png';
import { ITransaction } from '../../types';
import { CgSpinner } from 'react-icons/cg';

type Props = {
  visible: boolean;
  onClose: (transactionId: any) => void;
  refetch: (transactionId: any) => void;
  transaction: ITransaction;
  loadingCancel: boolean;
};

const Index = ({ visible, onClose, refetch, transaction, loadingCancel }: Props) => {
  const { t } = useTranslation('language');

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96" onClose={() => onClose(transaction.id)}>
      <Modal.Body className="p-1">
        <div className="flex place-content-center">
          <img src={pending.src} className="w-32 h-32" />
        </div>
        <div className="grid gap-2 place-items-center w-full">
          <span className="text-lg font-normal">Гүйлгээ хүлээгдэж байна</span>
          <span className=" text-sm text-misty font-normal">Гүйлгээ хийгдсэнээр таны захиалга баталгаажна</span>
        </div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <button
            onClick={() => onClose(transaction.id)}
            disabled={loadingCancel}
            className="w-8/12 flex place-content-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
          >
            {loadingCancel && <CgSpinner className="text-lg text-current mr-1 animate-spin" />}
            <span className="block  text-sm text-current   font-semibold ">{t('mainPage.GoBack')}</span>
          </button>
          <div
            onClick={() => refetch(transaction.id)}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.Paid')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
