import MiniSearch from 'minisearch';
import React, { useState } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { isEmpty } from 'lodash';
import { toLatinConvert } from '../../tools/toLatin';
import dynamic from 'next/dynamic';
import CardSkelton from '../../components/Skelton/CardSkelton';
import { getPayload } from '../../providers/auth';
import { useQuery } from '@apollo/client';
import { GET_LOYALTIES_RECORDS } from '../../graphql/query/loyalty';
import { RankingCard } from '../../components';

const SideBarCategories = dynamic(() => import('../../components/Categories/SideBarCategories'));
const Products = dynamic(() => import('../../components/Products/Products'), {
  loading: () => <CardSkelton />,
});
const SearchProducts = dynamic(() => import('../../components/SearchBar/SearchBarProducts'));
const Categories = dynamic(() => import('../../components/Categories/Categories'));
const DraftOrder = dynamic(() => import('../../components/Order/DraftOrder'));

const Index = () => {
  const { participant } = useCallStore();
  const { role } = getPayload();
  const [searchField, setSearchField] = useState<string>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => {
    const firstCategory = participant.menu.categories[0];
    return firstCategory ? firstCategory.id : '';
  });

  const { data } = useQuery(GET_LOYALTIES_RECORDS, {
    skip: role !== 'customer',
  });

  const promotion = data?.getLoyaltyRecords.find((val) => val.type === 'G');
  const configs = promotion?.loyalty.configs
    .filter((config) => config.name !== 'TYPE_G')
    .sort((a, b) => {
      const aIndex = JSON.parse(a.value).index;
      const bIndex = JSON.parse(b.value).index;
      return aIndex - bIndex;
    });

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(() => {
    const category = participant.menu.categories.find((c) => c.id === selectedCategoryId);
    const firstSubCategory = category?.children[0];
    return firstSubCategory ? firstSubCategory.id : '';
  });

  const products = participant.menu.categories.flatMap((category) => {
    const mainCategoryProducts = category.products;
    const childCategoryProducts = category.children.flatMap((child) => child.products);

    return [...mainCategoryProducts, ...childCategoryProducts];
  });

  let miniSearch = new MiniSearch({
    fields: ['nameEn', 'descriptionEn'],
    storeFields: ['name', 'description', 'variants', 'image', 'bonus', 'specification'],
    searchOptions: {
      boost: { name: 2, description: 1 },
      fuzzy: 0.3,
      prefix: true,
    },
  });

  miniSearch.addAll(
    products.map((item) => ({
      ...item,
      nameEn: toLatinConvert(item.name),
      descriptionEn: toLatinConvert(item.description),
    })),
  );

  function getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId) {
    if (!isEmpty(searchField)) {
      const results = miniSearch.search(searchField);
      return results.length > 0 ? [results[0]] : [];
    }

    const category = participant.menu.categories.find((category) => category.id === selectedCategoryId);
    if (category) {
      const subCategory = category.children?.find((subCategory) => subCategory.id === selectedSubCategoryId);
      return subCategory?.products ?? category.products ?? [];
    }
    return [];
  }

  let isFirstIteration = true;

  return (
    <>
      <div className="place-items-start hidden xl:grid grid-cols-10">
        <div className="col-span-2 w-full">
          <SideBarCategories
            categories={participant.menu.categories}
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedSubCategoryId={setSelectedSubCategoryId}
          />
        </div>
        <div className="col-span-5  w-full ">
          <SearchProducts setSearchField={setSearchField} placeHolder="Рестораны нэр, хоолны нэр хайх..." />
          <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
        </div>
        <div className=" col-span-3 w-full  mt-4 ">
          <DraftOrder />
        </div>
      </div>
      <div className="block xl:hidden">
        <Categories
          categories={participant.menu.categories}
          selectedCategoryId={selectedCategoryId}
          selectedSubCategoryId={selectedSubCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          setSelectedSubCategoryId={setSelectedSubCategoryId}
        />
        {promotion && (
          <div className="flex  p-2">
            <div className="flex flex-nowrap gap-2 w-full">
              <div className="bg-white flex rounded-xl w-full  drop-shadow-lg pr-6 pt-1 dark:bg-gray-700 px-4 ">
                {promotion?.loyalty.configs
                  .filter((config) => config.name !== 'TYPE_G')
                  .sort((a, b) => {
                    const aIndex = JSON.parse(a.value).index;
                    const bIndex = JSON.parse(b.value).index;
                    return aIndex - bIndex;
                  })
                  .map((record, index) => {
                    let isActive = true;

                    const { image, value, description, color } = JSON.parse(record.value);

                    if (Number(promotion.amount) < Number(value)) {
                      if (isFirstIteration) {
                        isActive = false;
                        isFirstIteration = false;
                      }
                    }

                    return (
                      <div className="w-full " key={record.id}>
                        <RankingCard
                          configs={configs}
                          isRounded={false}
                          index={index + 1}
                          color={color}
                          key={record.id}
                          name={record.name}
                          progress={promotion.progress}
                          image={image}
                          price={value}
                          description={description}
                          amount={promotion.amount}
                          isActive={isActive}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
      </div>
    </>
  );
};

export default Index;
