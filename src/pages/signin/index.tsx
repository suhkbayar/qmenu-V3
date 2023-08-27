import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiArrowBack } from 'react-icons/bi';
import { LoginCarousel, SignInForm } from '../../components';
import { useCallStore } from '../../contexts/call.store';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

const Index = () => {
  const router = useRouter();
  const { participant } = useCallStore();
  const { t } = useTranslation('language');

  const goBack = () => {
    router.push(`restaurant?id=${participant.id}`);
  };

  return (
    <>
      <div className="relative  top-0 w-full z-10 bg-white py-2 md:py-4 dark:bg-gray-800  ">
        <div className="container flex w-full place-items-center px-4 mx-auto md:flex md:items-center">
          <div>
            <BiArrowBack onClick={goBack} className="text-xl dark:text-white " />
          </div>
          <div className="flex w-full place-items-center place-content-center">
            <p className="text-gray1 p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
              {t('mainPage.login')}
            </p>
          </div>
        </div>
      </div>
      <div className=" login-body flex md:grid grid-cols-6 md:">
        <div className=" md:col-span-4 place-self-center">
          <div className="hidden h-[40rem] md:flex  w-[31rem] ">
            <LoginCarousel />
          </div>
        </div>

        <div className="w-full md:flex md:place-items-center col-span-2 md:h-full ">
          <div className="w-full xl:w-96 ">
            <SignInForm goBack={goBack} />
            <div className="pb-2 px-8  w-full">
              <div className="relative  flex pb-6 items-center">
                <div className="flex-grow border-t border-gray1"></div>
                <span className="flex-shrink mx-4 text-gray1 text-sm ">эсвэл</span>
                <div className="flex-grow border-t border-gray1"></div>
              </div>
              <a className="flex items-center justify-center px-4 py-2 md:px-5 py-3 space-x-2 transition-colors duration-300 border border-gray1 rounded-md group focus:outline-none">
                <span>
                  <FcGoogle className="text-lg" />
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">Gmail - ээр нэвтрэх</span>
              </a>
              <div className="py-5">
                <a className="flex items-center  justify-center px-4 py-2 md:px-5 py-3 space-x-2 transition-colors duration-300 border border-blue-600 bg-blue-600 rounded-md group  focus:outline-none">
                  <span>
                    <BsFacebook className="text-lg text-white hover:text-blue-600" />
                  </span>
                  <span className="text-sm  font-medium text-white ">Facebook - ээр нэвтрэх</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
