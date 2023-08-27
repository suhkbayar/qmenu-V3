import React from 'react';
import { useTranslation } from 'react-i18next';
import { SiItunes } from 'react-icons/si';

const Index = () => {
  const { t } = useTranslation('language');
  return (
    <>
      <div
        role="status"
        className="p-4 space-y-4 flex place-content-center place-items-center w-full  h-[50vh] rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 md:w-full dark:border-gray-700"
      >
        <div>
          <SiItunes className="text-gray-700 w-32 h-32" />
          <span className="text-gray1">{t('mainPage.NoSongsFound')}</span>
        </div>
      </div>
    </>
  );
};

export default Index;
