import React, { useEffect, useState } from 'react';
import { BiSearchAlt2, BiInfoCircle } from 'react-icons/bi';
import ToggleLanguage from '../../components/Button/ToggleLanguage';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { AboutUsSidebar } from '../../components';
import notificationIcon from '../../assets/icons/notifcations.png';
import { useNotificationContext } from '../../providers/notification';
import { isEmpty } from 'lodash';

type Props = {
  isBacked?: boolean;
};

const Index = ({ isBacked }: Props) => {
  const router = useRouter();
  const { t } = useTranslation('language');
  const { participant } = useCallStore();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { notificationState, getNotifications } = useNotificationContext();

  useEffect(() => {
    if (participant?.channel !== 'W') {
      getNotifications({ variables: { limit: 10, nextToken: null } });
    }
  }, [participant]);

  const goBack = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  const goSearchProducts = () => {
    router.push(`search-products`);
  };

  const goNotifications = () => {
    router.push(`notification`);
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <>
      <div
        className={`absolute top-0 w-full z-10 ${
          isEmpty(participant?.branch.banner) ? 'bg-gray-400' : 'bg-transparent'
        } py-2 md:py-4 dark:bg-transparent`}
      >
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <p>
              {isBacked && <BiArrowBack className="text-white text-xl" onClick={() => goBack()} />}
              {participant.channel === 'W' && <BiArrowBack className="text-white text-xl" onClick={() => goHome()} />}
            </p>

            <div className="flex gap-3 text-xl md:hidden text-white">
              <BiSearchAlt2 onClick={() => goSearchProducts()} />
              <BiInfoCircle onClick={() => setSidebarVisible(true)} />
              {participant.channel !== 'W' && (
                <div className="relative">
                  <img src={notificationIcon.src} onClick={() => goNotifications()} />
                  {(notificationState.notifications.filter((e) => !e.isRead)?.length || 0) > 0 && (
                    <span className="absolute bg-[#f43f5e] top-0 right-0 inline-flex items-center py-0.2 px-0.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2  text-white">
                      {notificationState.notifications.filter((e) => !e.isRead)?.length || 0}
                    </span>
                  )}
                </div>
              )}
              <ToggleLanguage />
            </div>
          </div>

          <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
            <a
              onClick={() => setSidebarVisible(true)}
              className=" text-white text-sm p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              {t('mainPage.aboutRestaurant')}
            </a>
            <a className=" text-white text-sm p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.OrderHistory')}
            </a>
            <div className="flex gap-3  ">
              <ToggleLanguage />
            </div>
          </div>
        </div>
      </div>
      {sidebarVisible && <AboutUsSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />}
    </>
  );
};

export default Index;
