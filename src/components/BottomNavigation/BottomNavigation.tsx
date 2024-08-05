import { useRouter } from 'next/router';
import React from 'react';
import { TbSearch } from 'react-icons/tb';
import { GiMicrophone } from 'react-icons/gi';
import { BsClockHistory } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { IoHomeOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useCallStore } from '../../contexts/call.store';
import { useQuery } from '@apollo/client';
import { ME } from '../../graphql/query/user';
import { getPayload } from '../../providers/auth';
import { isEmpty } from 'lodash';
import { OrderTotalButton } from '..';
import { GET_ORDERS } from '../../graphql/query/order';
import { ACTIVE_STATES } from '../../constants/constant';

const BottomNavigation = () => {
  const router = useRouter();
  const { t } = useTranslation('language');
  const { participant, setUser, config } = useCallStore();

  const { role, features } = getPayload();

  const { data: userData } = useQuery(ME, {
    skip: role !== 'customer',
    onCompleted: (data) => {
      setUser(data.me);
    },
  });

  const { data } = useQuery(GET_ORDERS, { skip: participant?.channel === 'W' });

  const example = () => {
    router.push(`history`);
  };

  const goHome = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  const goKaraoke = () => {
    router.push(`karaoke?id=${participant.id}`);
  };

  const goSignIn = () => {
    router.push(`signin`);
  };

  const goAccount = () => {
    router.push(`account`);
  };

  const goSearchProducts = () => {
    router.push(`search-products`);
  };

  return (
    <>
      <div className="w-full  block xl:hidden">
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10">
          {participant.channel === 'Q' && (
            <>
              <div>
                <OrderTotalButton />
              </div>
              <div
                id="tabs"
                className="flex justify-between rounded-t-lg z-8 bg-white dark:bg-gray-700 shadow"
                style={{ background: config.navbarBackgroundColor }}
              >
                <div
                  className={`w-full ${
                    router.pathname === '/restaurant' ? 'text-current ' : 'text-gray-500 dark:text-white'
                  }   focus:text-current  hover:text-current justify-center grid content-between place-items-center inline-block text-center pt-2 pb-1`}
                  onClick={() => goHome()}
                  style={{ color: config?.textColor }}
                >
                  <IoHomeOutline className="inline-block mb-1 w-6 h-6 " />
                  <span className="tab tab-home  block text-xs">{t('mainPage.homeLinkShort')}</span>
                </div>
                <div
                  onClick={() => goSearchProducts()}
                  className={`w-full ${
                    router.pathname === '/search-products' ? 'text-current ' : 'text-gray-500 dark:text-white'
                  }   focus:text-current  hover:text-current justify-center grid content-between place-items-center inline-block text-center pt-2 pb-1`}
                >
                  <TbSearch className="inline-block mb-1 w-6 h-6 " />
                  <span className="tab tab-kategori block text-xs">{t('mainPage.SearchForFoodShort')}</span>
                </div>

                {!isEmpty(features?.filter((feature) => feature === 'KRK')) && (
                  <div
                    className={`w-full ${
                      router.pathname === '/karaoke' ? 'text-current ' : 'text-gray-500 dark:text-white'
                    }  focus:text-current  hover:text-current justify-center inline-block grid content-between place-items-center text-center pt-2 pb-1`}
                    onClick={() => goKaraoke()}
                  >
                    <GiMicrophone className="inline-block mb-1 w-6 h-6 " />
                    <span className="tab tab-explore block text-xs">{t('mainPage.Karaoke')}</span>
                  </div>
                )}

                <div
                  className={`w-full ${
                    router.pathname === '/history' ? 'text-current ' : 'text-gray-500 dark:text-white'
                  }  focus:text-current  hover:text-current  justify-center  inline-block grid content-between place-items-center text-center pt-2 pb-1`}
                  onClick={() => example()}
                >
                  <div className="relative">
                    <BsClockHistory className="inline-block mb-1 w-6 h-6 " />
                    {data && (
                      <span className="absolute bg-[#f43f5e] top-0 right-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2  text-white">
                        {data.getOrders.filter((order) => !ACTIVE_STATES.includes(order.state))?.length}
                      </span>
                    )}
                  </div>

                  <span className="tab tab-whishlist block text-xs">{t('mainPage.OrderHistoryShort')}</span>
                </div>

                {!isEmpty(userData?.me) && (
                  <div
                    onClick={() => goAccount()}
                    className={`w-full ${
                      router.pathname === '/signin' ? 'text-current ' : 'text-gray-500 dark:text-white'
                    } focus:text-current  hover:text-current justify-center grid content-between place-items-center inline-block text-center pt-2 pb-1`}
                  >
                    <AiOutlineUser className="inline-block mb-1 w-6 h-6 " />
                    <span className="tab tab-account block text-xs">Профайл</span>
                  </div>
                )}
                {isEmpty(userData?.me) && (
                  <div
                    onClick={() => goSignIn()}
                    className={`w-full ${
                      router.pathname === '/signin' ? 'text-current ' : 'text-gray-500 dark:text-white'
                    }  focus:text-current  hover:text-current justify-center grid content-between place-items-center inline-block text-center pt-2 pb-1`}
                  >
                    <AiOutlineUser className="inline-block mb-1 w-6 h-6 " />
                    <span className="tab tab-account block text-xs">{t('mainPage.User')}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default BottomNavigation;
