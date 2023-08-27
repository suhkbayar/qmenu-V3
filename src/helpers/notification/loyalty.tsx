import React from 'react';
import { Modal } from 'flowbite-react';
import { customLoyaltyModal } from '../../../styles/themes';
import { NotificationActionType } from '../../constants/constant';
import { INotificationAction } from '../../types/notification';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import giftIcon from '../../assets/icons/gift-solid.png';

export const LoyaltyModal = ({ type, visible, message, onClose, title, image, actions }) => {
  const router = useRouter();

  const renderFooter = () => {
    const renderItem = (item?: INotificationAction) => {
      let action = async () => {
        if (item?.type === NotificationActionType.L) await router.push(item.value);
        // {} else ...
        onClose();
      };

      return (
        <div
          key={`${item?.type}${item?.value}`}
          onClick={action}
          className={`w-6/12 min-w-max h-11 flex place-content-center gap-2 justify-center items-center border border-current p-2.5 rounded-[50px] cursor-pointer bg-current`}
        >
          {type === 'P' && <img className="text-current" src={giftIcon.src} />}
          <span className="break-normal whitespace-nowrap text-sm font-semibold text-white">
            {item?.name || 'Хаах'}
          </span>
        </div>
      );
    };

    let renderItems =
      actions && !isEmpty(actions) ? actions.map((action: INotificationAction) => renderItem(action)) : [renderItem()];

    return (
      <div className="flex justify-center items-center w-full gap-3 overflow-x-auto">
        {renderItems.map((item: INotificationAction) => item)}
      </div>
    );
  };

  return (
    <Modal
      style={{ zIndex: 100 }}
      dismissible
      show={visible}
      popup
      theme={customLoyaltyModal}
      onClose={() => onClose()}
    >
      <Modal.Body className="p-3 flex flex-col items-center">
        <div className="mb-3 text-black text-opacity-90 text-sm font-normal">{title || 'Мэдэгдэл'}</div>
        {image && (
          <img className={`${type === 'P' ? 'w-[283px] h-[180px]' : 'w-[283px] h-[250px]'} rounded-md`} src={image} />
        )}
        <div className="text-red-500 text-sm font-medium m-2">Таньд баяр хүргье!</div>
        <div className="text-center text-neutral-400 text-xs font-normal">{message}</div>
      </Modal.Body>

      <Modal.Footer className="place-content-center p-3 pt-0">{renderFooter()}</Modal.Footer>
    </Modal>
  );
};
