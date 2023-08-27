import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { CgSpinner } from 'react-icons/cg';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

type Props = {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  onConfirm: () => void;
};

const Index = ({ visible, onClose, onConfirm, loading }: Props) => {
  const { t } = useTranslation('language');

  return (
    <Modal show={visible} theme={customThemeWaiterModal} className="flex h-96" onClose={() => onClose()}>
      <Modal.Body className="p-1">
        <Alert additionalContent={t('mainPage.isAdultsOnlyDescription')} color="warning" icon={HiInformationCircle}>
          <span>
            <p>
              <span className="font-medium"> {t('mainPage.isAdultsOnly')} </span>
            </p>
          </span>
        </Alert>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <div
            onClick={() => onClose()}
            className="w-8/12 flex place-content-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-current   font-semibold ">{t('mainPage.No')}</span>
          </div>

          <button
            disabled={loading}
            onClick={() => onConfirm()}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.Yes')}</span>
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
