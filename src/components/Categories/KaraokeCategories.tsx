import React from 'react';
import { IKaraokeCategory } from '../../types/karaoke';

type Props = {
  selectedCategoryId: string;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
  categories: IKaraokeCategory[];
};

const Index = ({ selectedCategoryId, setSelectedCategoryId, categories }: Props) => {
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="sticky top-0 z-10 w-full m-0 xl:hidden bg-white dark:bg-gray-800 pt-2 pb-2 pl-2 pr-2 rounded drop-shadow-xl">
      <div className="flex space-x-2" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`rounded-lg${selectedCategoryId && category.id === selectedCategoryId ? ' bg-opacity-60' : ''}`}
            style={{
              backgroundColor: selectedCategoryId && category.id === selectedCategoryId ? '#f2633399' : '#a8abb3',
            }}
          >
            <a
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex rounded-md h-6 md:h-8 m-1 md:m-2 items-center space-y-1"
              style={{
                backgroundColor: selectedCategoryId && category.id === selectedCategoryId ? '#f26333' : '#a8abb3',
              }}
            >
              <span className="whitespace-nowrap pl-3 pr-3 pt-1 pb-1 text-xs md:text-base text-white font-semibold">
                {category.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
