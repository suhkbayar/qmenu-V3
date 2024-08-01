import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { AiFillCheckCircle } from 'react-icons/ai';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const Index = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');

  return (
    <Modal show={visible} theme={customThemeWaiterModal} onClose={onClose}>
      <Modal.Body>
        <div className="flex place-content-center">
          <div className="h-24 w-24">
            <AiFillCheckCircle className="text-success text-2xl h-full w-full " />
          </div>
        </div>
        <div className="font-medium text-center my-2 w-52 mx-auto">{t('mainPage.StartPreOrder')}</div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <button
            onClick={onClose}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            {/* {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />} */}
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.Close')}</span>
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
