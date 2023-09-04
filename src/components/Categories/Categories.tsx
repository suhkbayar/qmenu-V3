import React from 'react';
import { IMenuCategory } from '../../types';

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
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(categories.find((category) => category.id === categoryId)?.children[0]?.id);
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  return (
    <>
      <div className="sticky top-0 z-10 w-full m-0 xl:hidden bg-white dark:bg-gray-800 pt-3 pb-0 pl-2 pr-2 rounded drop-shadow-xl">
        <div className="flex space-x-2" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`rounded-lg mb-3 ${
                selectedCategoryId && category.id === selectedCategoryId ? ' bg-opacity-60' : ''
              }`}
              style={{
                background:
                  selectedCategoryId && category.id === selectedCategoryId
                    ? `${category.color}99`
                    : `${category.color}`,
              }}
            >
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex rounded-md h-6 md:h-8 m-1 md:m-2 items-center space-y-1"
                style={{ backgroundColor: category.color }}
              >
                <a className="whitespace-nowrap pl-3 pr-3 pt-1 pb-1 text-xs md:text-base text-white font-semibold">
                  {category.name}
                </a>
              </li>
            </div>
          ))}
        </div>
      </div>

      {selectedSubCategoryId && (
        <div className="sticky top-12 z-10 w-full m-0 xl:hidden bg-white dark:bg-gray-800 pt-0 pb-0 pl-2 pr-2 rounded drop-shadow-xl">
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
                    background:
                      selectedSubCategoryId && subCategory.id === selectedSubCategoryId
                        ? `${subCategory.color}99`
                        : `${subCategory.color}`,
                  }}
                >
                  <li
                    key={subCategory.id}
                    onClick={() => handleSubCategoryClick(subCategory.id)}
                    style={{ background: `${subCategory.color ?? '#999'}` }}
                    className="flex rounded-md h-6 m-1 md:h-8 m-1 md:m-2 items-center space-y-1"
                  >
                    <a className="whitespace-nowrap pl-3 pr-3 pt-1 pb-1 text-xs md:text-base text-white font-semibold">
                      {subCategory.name}
                    </a>
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
