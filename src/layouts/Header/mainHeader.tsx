import React, { useState } from 'react';
import logo from '../../assets/images/newQ.png';
import { useTranslation } from 'react-i18next';
import Text from '../../components/Text/Text';
import ToggleLanguage from '../../components/Button/ToggleLanguage';

const MainHeader = () => {
  const { t } = useTranslation('language');
  const [isExpanded, toggleExpansion] = useState(false);

  const handleLink = (e: any) => {
    window.open(e, '_blank');
  };

  return (
    <>
      <div className="flex-wrap">
        <nav className="flex items-center justify-between flex-wrap bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img src={logo.src} className="mr-3 h-6 sm:h-9" alt="Logo" />
          </div>
          <div className="flex lg:hidden gap-3">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray1 border-gray1 hover:text-white hover:border-gray1"
              onClick={() => toggleExpansion(!isExpanded)}
            >
              <svg className=" h-3 w-3" fill="#999" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
            <div className="flex gap-3 ">
              <ToggleLanguage />
            </div>
          </div>

          <div
            className={`${isExpanded ? `block` : `hidden`} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-base lg:flex-grow">
              <a
                onClick={() => handleLink('https://about.qmenu.mn/')}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                <Text text={t('mainPage.AboutQmenu')} />
              </a>
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Text text={t('mainPage.homeLink')} />
              </a>
            </div>
            <div className="flex place-items-center">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Text text={t('mainPage.login')} />
              </a>
            </div>
            <div className="flex place-items-center">
              <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                <Text text={t('mainPage.register')} />
              </a>
            </div>

            <div className="flex gap-3 invisible lg:visible">
              <ToggleLanguage />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MainHeader;
