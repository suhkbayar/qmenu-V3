import React from 'react';
import { Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import waiter from '../../assets/images/waiter.png';
import { useMutation } from '@apollo/client';
import { WAITER_CALL } from '../../graphql/mutation/waiter';
import { NotificationType } from '../../constants/constant';
import { useNotificationContext } from '../../providers/notification';

type Props = {
  visible: any;
  onClose: () => void;
};

const Index = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');
  const { showNotification } = useNotificationContext();

  const [call] = useMutation(WAITER_CALL, {
    onCompleted: () => {
      showNotification(NotificationType.SUCCESS);
      onClose();
    },
  });

  return (
    <Modal show={visible} theme={customThemeWaiterModal} onClose={() => onClose()}>
      <Modal.Body className="p-1">
        <div className="flex place-content-center">
          <img src={waiter.src} className="w-24 h-24" />
        </div>
        <div className="text-sm mt-2 text-misty text-center font-semibold ">{t('mainPage.Waiter')}</div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <div
            onClick={() => onClose()}
            className="w-8/12 flex place-content-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-current   font-semibold ">{t('mainPage.No')}</span>
          </div>

          <div
            onClick={() => call()}
            className="w-8/12 flex place-content-center justify-center bg-current p-3 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.Yes')}</span>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default Index;
