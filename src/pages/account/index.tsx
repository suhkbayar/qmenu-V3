import React, { useContext } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { SlUserFemale, SlUser } from 'react-icons/sl';
import { BiArrowBack } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ME } from '../../graphql/query/user';
import userInfo from '../../assets/user/userInfo.png';
import heart from '../../assets/user/heart.png';
import discount from '../../assets/user/Discount.svg';
import Calories from '../../assets/user/Calories.svg';
import Basket from '../../assets/user/Basket.svg';
import Camera from '../../assets/user/Camera.svg';
import logout from '../../assets/user/logout.png';
import { CURRENT_TOKEN } from '../../graphql/mutation/token';
import { AuthContext } from '../../providers/auth';
import Loader from '../../components/Loader/Loader';
import ToggleButton from '../../components/Button/ToggleButton';
import bonus from '../../assets/user/bonus.svg';
import { GET_LOYALTIES_RECORDS, GET_ORDERS } from '../../graphql/query';

const Index = () => {
  const { participant, setUser } = useCallStore();
  const { authenticate } = useContext(AuthContext);
  const { data } = useQuery(ME, {
    onCompleted: (data) => {
      setUser(data.me);
    },
  });

  const [getLoyaltiesRecords] = useLazyQuery(GET_LOYALTIES_RECORDS);
  const [getOrder, { refetch }] = useLazyQuery(GET_ORDERS);

  const onSuccess = async (id) => {
    await getLoyaltiesRecords();
    await refetch();
    router.push(`restaurant?id=${id}`);
  };

  const [getCurrentToken, { loading }] = useMutation(CURRENT_TOKEN, {
    onCompleted: (data) => {
      authenticate(data.getToken.token, () => onSuccess(data.getToken.id));
    },
    onError(err) {
      router.push('/notfound');
    },
  });

  const { t } = useTranslation('language');
  const router = useRouter();

  const goBack = () => {
    router.push(`/restaurant?id=${participant.id}`);
  };

  const onLogout = () => {
    const qr = localStorage.getItem('qr');
    if (qr) {
      localStorage.removeItem('token');
      getCurrentToken({ variables: { code: qr, type: 'Q' } });
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="bg-white h-screen dark:bg-gray-800 ">
        <div className=" p-6 pb-0">
          <div className="flex justify-between ">
            <div>
              <BiArrowBack onClick={goBack} className="text-xl dark:text-white " />
            </div>
            <ToggleButton />
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="flex place-items-center place-content-center bg-gainsboro w-20 h-20 rounded-full">
              {data && data.me?.gender === 'Male' ? (
                <SlUser className="text-grayish  w-10 h-10 " />
              ) : (
                <SlUserFemale className="text-grayish  w-10 h-10" />
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">{data && data.me?.firstName}</h2>
          <p className="text-gray-500 text-center mb-2 dark:text-white">{data && data.me?.phone}</p>
        </div>
        <div className=" p-3 md:flex md:justify-center">
          <ul className=" md:w-1/3 space-y-2">
            <div
              onClick={() => router.push('/account/edit')}
              className="flex cursor-pointer hover:bg-gainsboro dark:hover:bg-gray1 items-center rounded-lg  place-content-between p-2"
            >
              <div className="flex place-content-between">
                <img src={userInfo.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">{t('mainPage.CustomerInformation')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>
            <div className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2">
              <div className="flex place-content-between">
                <img src={heart.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">{t('mainPage.MyFavorite')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1  items-center place-content-between p-2">
              <div className="flex place-content-between">
                <img src={discount.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">{t('mainPage.DiscountCards')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div
              onClick={() => router.push('/account/basket')}
              className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
            >
              <div className="flex place-content-between">
                <img src={Basket.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">Миний сагс</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div
              onClick={() => router.push('/account/bonus')}
              className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
            >
              <div className="flex place-content-between">
                <img src={bonus.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">Урамшуулал </span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2">
              <div className="flex place-content-between">
                <img src={Calories.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">{t('mainPage.GiftCoupon')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div className="flex  cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2">
              <div className="flex place-content-between">
                <img src={Camera.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white ">{t('mainPage.ShareWithOthers')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>

            <div
              onClick={() => onLogout()}
              className="flex cursor-pointer hover:bg-gainsboro rounded-lg dark:hover:bg-gray1 items-center place-content-between p-2"
            >
              <div className="flex place-content-between">
                <img src={logout.src} className="h-7 w-7 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-white">{t('mainPage.Signout')}</span>
              </div>
              <FiChevronRight className="text-gray-500 text-xl dark:text-white" />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Index;
