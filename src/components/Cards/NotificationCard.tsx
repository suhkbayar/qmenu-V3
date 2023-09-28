import React from 'react';
import { INotification } from '../../types/notification';
import { getTimeDiff } from '../../utils';
import { useNotificationContext } from '../../providers/notification';

type Props = {
  notification: INotification;
};

const Index = ({ notification: item }: Props) => {
  const { showLoyaltyNotification, showCustomNotification, markAsRead } = useNotificationContext();

  const show = () => {
    try {
      const data = JSON.parse(item.data);
      showLoyaltyNotification(
        data?.type,
        item.title,
        data?.message?.statusMessage || '',
        data?.type === 'G' ? data.group : data.product?.image,
        item.actions,
      );
    } catch (error) {
      showCustomNotification(item.title, item.data);
    }
    if (!item.isRead) markAsRead(item);
  };

  const getData = () => {
    try {
      const data = JSON.parse(item.data);
      return data?.message?.statusMessage;
    } catch (error) {
      return item.data || '';
    }
  };

  const getImage = () => {
    try {
      const data = JSON.parse(item.data);
      return data?.branch?.image;
    } catch (error) {
      return null;
    }
  };

  return (
    <div
      onClick={() => show()}
      className={`cursor-pointer p-3 mb-4 rounded-xl w-full place-content-between drop-shadow-lg  dark:bg-gray-700 ${
        item?.isRead ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="grid grid-cols-6 gap-3 place-items-center">
        <div className="col-span-1">
          {getImage() && (
            <img className="w-10 h-10 rounded-full border border-zinc-100" alt="branch-image" src={getImage()} />
          )}
        </div>
        <div className="col-span-5">
          <div className="flex gap-1 justify-between items-start">
            <span className={`break-all ${item?.isRead ? 'text-gray-500' : ''}`}>{item.title}</span>
            <div className="text-xs text-misty whitespace-nowrap leading-6">{getTimeDiff(item.sk)}</div>
          </div>
          <div className="w-full ">
            <div className="flex gap-1 my-2">
              <div className="text-xs text-misty whitespace-break-spaces break-all">{getData()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
