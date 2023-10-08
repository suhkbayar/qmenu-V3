import MiniSearch from 'minisearch';
import React, { useState, useEffect } from 'react';
import { useCallStore } from '../../contexts/call.store';
import { isEmpty } from 'lodash';
import { toLatinConvert } from '../../tools/toLatin';
import dynamic from 'next/dynamic';
import CardSkelton from '../../components/Skelton/CardSkelton';
import { getPayload } from '../../providers/auth';
import { useQuery } from '@apollo/client';
import { GET_LOYALTIES_RECORDS } from '../../graphql/query/loyalty';
import { RankingCard, SmartBannerModal } from '../../components';
import { IMenuCategory } from '../../types/menu';
import { BannerType } from '../../types';

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
  const [categories, setCategories] = useState<IMenuCategory[]>();

  useEffect(() => {
    if (participant.menu.categories.length > 0) {
      setCategories(
        participant.menu.categories.filter((category) => {
          const allProductsInactive = category.products.every((product) => product.state !== 'ACTIVE');

          if (!isEmpty(category.children)) {
            const allChildrenInactive = category.children.every((childCategory) =>
              childCategory.products.every((product) => product.state !== 'ACTIVE'),
            );

            return !(allProductsInactive && allChildrenInactive);
          } else {
            return !allProductsInactive;
          }
        }),
      );
    }
  }, [participant]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => {
    const firstCategory = categories && categories[0];
    return firstCategory ? firstCategory.id : '';
  });

  useEffect(() => {
    if (categories) {
      const firstCategory = categories[0];
      setSelectedCategoryId(firstCategory?.id);
    }
  }, [categories]);

  const { data } = useQuery(GET_LOYALTIES_RECORDS, {
    skip: role !== 'customer',
  });

  const promotion = data?.getLoyaltyRecords.find((val) => val.type === 'T');
  const configs = promotion?.loyalty.configs
    .filter((config) => config.name !== 'TYPE_T')
    .sort((a, b) => {
      const aIndex = JSON.parse(a.value).index;
      const bIndex = JSON.parse(b.value).index;
      return aIndex - bIndex;
    });

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>(() => {
    const category = categories && categories.find((c) => c.id === selectedCategoryId);
    const firstSubCategory = category?.children[0];
    return firstSubCategory ? firstSubCategory.id : '';
  });

  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories && categories.find((c) => c.id === selectedCategoryId);
      if (category?.children.length > 0) {
        const firstSubCategory = category.children[0];
        setSelectedSubCategoryId(firstSubCategory.id);
      }
    }
  }, [selectedCategoryId, participant]);

  const products =
    categories &&
    categories.flatMap((category) => {
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

  products &&
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

    const category = categories && categories.find((category) => category.id === selectedCategoryId);
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
          {categories && (
            <SideBarCategories
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              selectedSubCategoryId={selectedSubCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              setSelectedSubCategoryId={setSelectedSubCategoryId}
            />
          )}
        </div>
        <div className={`  ${participant.channel === 'W' ? 'col-span-8 pr-6 ' : 'col-span-5 '}  w-full`}>
          <SearchProducts setSearchField={setSearchField} placeHolder="Рестораны нэр, хоолны нэр хайх..." />
          <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
        </div>
        {participant.channel !== 'W' && (
          <div className=" col-span-3 w-full  mt-4 ">
            <DraftOrder />
          </div>
        )}
      </div>
      <div className="block xl:hidden">
        {categories && (
          <Categories
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            selectedSubCategoryId={selectedSubCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedSubCategoryId={setSelectedSubCategoryId}
          />
        )}

        {participant.channel === 'Q' && (
          <>
            {promotion && (
              <div className="flex  p-2">
                <div className="flex flex-nowrap gap-2 w-full">
                  <div
                    className={`bg-white grid grid-cols-${
                      configs.length * 2 === 8 ? 10 : configs.length * 2
                    } rounded-xl w-full  drop-shadow-lg pr-6 pt-1 dark:bg-gray-700 px-4 `}
                  >
                    {promotion?.loyalty.configs
                      .filter((config) => config.name !== 'TYPE_T')
                      .sort((a, b) => {
                        const aIndex = JSON.parse(a.value).index;
                        const bIndex = JSON.parse(b.value).index;
                        return aIndex - bIndex;
                      })
                      .map((record, index) => {
                        let isActive = true;

                        const { image, amount, description, color } = JSON.parse(record.value);
                        if (Number(promotion.amount) < Number(amount)) {
                          if (isFirstIteration) {
                            isActive = false;
                            isFirstIteration = false;
                          }
                        }

                        return (
                          <div className={` ${index === 3 ? 'col-span-4' : 'col-span-2'} `} key={record.id}>
                            <RankingCard
                              configs={configs}
                              isRounded={false}
                              index={index + 1}
                              color={color.value}
                              key={record.id}
                              name={record.name}
                              progress={promotion.progress}
                              image={image}
                              price={amount}
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
          </>
        )}

        <Products products={getSelectedProducts(participant, selectedCategoryId, selectedSubCategoryId)} />
        <SmartBannerModal types={[BannerType.PQ]} />
      </div>
    </>
  );
};

export default Index;
