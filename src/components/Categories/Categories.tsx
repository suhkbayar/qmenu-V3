import React, { useEffect } from 'react';
import { IMenuCategory } from '../../types';
import { Translate } from 'react-auto-translate';
import { isEmpty } from 'lodash';
import { useCallStore } from '../../contexts/call.store';

type Props = {
  selectedCategoryId: string;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
  selectedSubCategoryId: string;
  setSelectedSubCategoryId: (selectedSubCategoryId: string) => void;
  categories: IMenuCategory[];
};

const Index = ({
  selectedSubCategoryId,
  setSelectedSubCategoryId,
  selectedCategoryId,
  setSelectedCategoryId,
  categories,
}: Props) => {
  const { config } = useCallStore();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(categories.find((category) => category.id === categoryId)?.children[0]?.id);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  return (
    <>
      <div
        className={`sticky top-0 z-10 w-full m-0 xl:hidden  ${
          !config.backgroundColor && 'bg-white dark:bg-gray-800 '
        } pt-3 pb-0 pl-2 pr-2 rounded drop-shadow-xl`}
        style={
          config.backgroundColor && {
            background: config.backgroundColor,
          }
        }
      >
        <div className="flex space-x-2" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`rounded-lg mb-3 cursor-pointer ${
                selectedCategoryId && category.id === selectedCategoryId ? ' bg-opacity-60' : ''
              }`}
              style={{
                background: config.backgroundColor
                  ? config.backgroundColor
                  : selectedCategoryId && category.id === selectedCategoryId
                  ? `${category.color}99`
                  : `${category.color}`,
                border: `1px solid `,
                borderColor: config?.textColor,
              }}
            >
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex rounded-md h-6 md:h-8 m-1 md:m-2 items-center space-y-1"
                style={{
                  backgroundColor: config.backgroundColor ? config.backgroundColor : category.color,
                }}
              >
                <div
                  className={`whitespace-nowrap pl-3 pr-3 pt-1 pb-1 text-xs md:text-base font-semibold`}
                  style={{
                    color: config?.textColor ? config?.textColor : 'white',
                  }}
                >
                  {!isEmpty(category.name) && <Translate>{category.name}</Translate>}
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>

      {selectedSubCategoryId && (
        <div
          className={`sticky top-12 z-10 w-full m-0 xl:hidden ${
            !config.backgroundColor && 'bg-white dark:bg-gray-800 '
          } pt-0 pb-0 pl-2 pr-2 rounded drop-shadow-xl`}
          style={
            config.backgroundColor && {
              background: config.backgroundColor,
            }
          }
        >
          <div
            className="flex space-x-2"
            style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            {categories
              .find((category) => category.id === selectedCategoryId)
              ?.children?.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className="rounded-lg mb-3"
                  style={{
                    background: config.backgroundColor
                      ? config.backgroundColor
                      : selectedCategoryId && subCategory.id === selectedCategoryId
                      ? `${subCategory.color}99`
                      : `${subCategory.color}`,
                    border: `1px solid `,
                    borderColor: config?.textColor,
                  }}
                >
                  <li
                    key={subCategory.id}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                    style={{
                      background: config.backgroundColor ? config.backgroundColor : `${subCategory.color ?? '#999'}`,
                    }}
                    className="flex rounded-md h-6 m-1 md:h-8  md:m-2 items-center space-y-1"
                  >
                    <div
                      className="whitespace-nowrap pl-3 pr-3 pt-1 pb-1 text-xs md:text-base text-white font-semibold"
                      style={{
                        color: config?.textColor ? config?.textColor : 'white',
                      }}
                    >
                      {!isEmpty(subCategory.name) && <Translate>{subCategory.name}</Translate>}
                    </div>
                  </li>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
