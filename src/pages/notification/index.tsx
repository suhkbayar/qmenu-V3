import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import Loader from '../../components/Loader/Loader';
import { AiOutlineInbox } from 'react-icons/ai';
import { NotificationCard } from '../../components';
import { isEmpty } from 'lodash';
import { INotification } from '../../types/notification';
import { useNotificationContext } from '../../providers/notification';

const Notification = () => {
  const router = useRouter();
  const { t } = useTranslation('language');
  const { getNotifications, notificationState, loadingGetNotifications: loading, refetch } = useNotificationContext();

  function isScrolling() {
    const element = document.getElementById('notification-scroll-div');
    if (element) {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        refetch();
      }
    }
  }

  const renderNotifications = () => {
    let notifications = notificationState.notifications;
    if (isEmpty(notifications)) {
      return (
        <div className="animate-pulse grid place-items-center ">
          <AiOutlineInbox className="text-gray-300 w-20 h-20" />
          <div className="w-full flex place-content-center text-sm text-grayish">
            {t('mainPage.NoNotificationFound')}
          </div>
        </div>
      );
    } else {
      return notifications.map((item: INotification, i: number) => (
        <NotificationCard key={item.sk} notification={item} />
      ));
    }
  };

  useEffect(() => {
    getNotifications({ variables: { limit: 10, nextToken: null } });
  }, []);

  return (
    <div className="relative h-screen flex flex-col items-center justify-center">
      <div className="relative shadow-lg top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <BiArrowBack onClick={router.back} className="text-xl dark:text-white" />
          <div className="flex w-full place-items-center place-content-center">
            <a className="text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.Notification')}
            </a>
          </div>
        </div>
      </div>
      <div
        id="notification-scroll-div"
        onScroll={() => isScrolling()}
        className={`${loading ? 'opacity-50' : ''} p-4 flex-1 overflow-y-auto`}
      >
        {renderNotifications()}
      </div>
      {loading && <Loader className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />}
    </div>
  );
};

export default Notification;
