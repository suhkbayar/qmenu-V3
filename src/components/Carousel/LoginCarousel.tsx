import React from 'react';
import { Carousel } from 'flowbite-react';
import banner1 from '../../assets/images/1page.svg';
import banner2 from '../../assets/images/2page.svg';
import banner3 from '../../assets/images/3page.svg';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation('language');
  return (
    <>
      <Carousel>
        <div className="transition-all">
          <img src={banner1.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
          <div className="text-center">
            <span className=" text-gray-700 font-semibold text-xl dark:text-white ">{t('mainPage.Delivery')}</span>
            <br />
            <span className="text-gray-500 dark:text-white">{t('mainPage.loginCarousel2')}</span>
          </div>
        </div>
        <div className="transition-all">
          <img src={banner2.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
          <div className="text-center">
            <span className=" text-gray-700 font-semibold text-xl dark:text-white ">{t('mainPage.PreOrder')}</span>
            <br />
            <span className="text-gray-500 dark:text-white">{t('mainPage.loginCarousel3')}</span>
          </div>
        </div>
        <div className="transition-all">
          <img src={banner3.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
          <div className="text-center">
            <span className=" text-gray-700 font-semibold text-xl dark:text-white ">{t('mainPage.digtalMenu')}</span>
            <br />
            <span className="text-gray-500 dark:text-white">{t('mainPage.loginCarousel1')}</span>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Index;
