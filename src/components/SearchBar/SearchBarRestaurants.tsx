import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SearchBarRestaurants = () => {
  const { t } = useTranslation('language');

  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  const sorts = [
    {
      name: `${t('mainPage.ILikedItTheMost')}`,
    },
    {
      name: `${t('mainPage.InAlphabeticalOrder')}`,
    },
    {
      name: `${t('mainPage.ByEvaluation')}`,
    },
    {
      name: `${t('mainPage.TheCheapest')}`,
    },
    {
      name: `${t('mainPage.AtTheDeliveryPrice')}`,
    },
  ];

  return (
    <>
      <div className="relative  md:flex sticky top-0 z-20 bg-white p-4 place-content-between gap-4  dark:bg-gray-800">
        <div className="dropdown w-80 hidden md:flex">
          <button
            className="text-black w-full border place-content-between border-gray-300 dark:text-gray1 rounded-3xl bg-white hover:bg-white focus:ring-gray-100 focus:outline-none focus:ring-gray-100 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
            onClick={handleDropDown}
          >
            {t('mainPage.SORT')}
            <svg
              className="ml-2 w-4 h-4"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div
            id="dropdown"
            className={`absolute z-10 w-50 mt-12 l-10 bg-white rounded divide-y divide-gray-100 shadow ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <ul className=" z-10 w-50 bg-white l-10  rounded divide-y divide-gray-100 shadow ">
              {sorts.map((item) => (
                <li onClick={handleDropDown} key={item.name}>
                  <a className="block  py-2 px-4 hover:bg-gray-100">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative w-4/4  ml-0 mr-0 md:w-3/4 md:ml-10 md:mr-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            id="default-search"
            className="w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-100 dark:focus:border-gray-100"
            placeholder="Рестораны нэр, хоолны нэр хайх..."
          />
        </div>
        <div className="w-1/4 hidden md:flex "></div>
      </div>
    </>
  );
};

export default SearchBarRestaurants;
