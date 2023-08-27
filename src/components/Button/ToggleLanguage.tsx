import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Languages } from '../../constants/constantLang';

const ToggleLanguage = () => {
  const { i18n } = useTranslation('language');
  const [isShow, setIsShow] = useState(false);

  const onSelect = (lang: string) => {
    setIsShow(false);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="place-self-center">
      <img
        height={10}
        width={28}
        src={
          Languages.find((item) => i18n.language.includes(item.name.toLowerCase())).icon.src ?? Languages[0].icon.src
        }
        onClick={() => setIsShow(!isShow)}
      />
      {isShow && (
        <ul className="rounded-lg absolute dropdown-menu bg-white text-gray-700 pt-1 right-4 top-11 w-32">
          <div className="grid grid-rows-4 grid-flow-col gap-4  p-2 rounded-lg items-center place-items-center">
            {Languages.map((item, index) => (
              <img
                key={item.name}
                height={10}
                width={28}
                onClick={() => onSelect(item.name.toLowerCase())}
                src={Languages[index].icon.src}
              />
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default ToggleLanguage;
