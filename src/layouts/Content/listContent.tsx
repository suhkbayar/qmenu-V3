import React, { useEffect, useRef, useState } from 'react';
import { groupBy, isEmpty } from 'lodash';
import { GroupedVirtuoso } from 'react-virtuoso';
import { useCallStore } from '../../contexts/call.store';
import { IMenuCategory } from '../../types';
import { ListProduct } from '../../components';

const Index = () => {
  const { participant } = useCallStore();
  const { order } = useCallStore();
  const virtuoso = useRef(null);
  const [categories, setCategories] = useState<IMenuCategory[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState(false);
  let imgUrl = participant?.branch?.background;
  useEffect(() => {
    const filteredCategories = participant.menu.categories.filter((category) => {
      const allProductsInactive = category.products.every((product) => product.state !== 'ACTIVE');
      const allChildrenInactive = category.children.every((childCategory) =>
        childCategory.products.every((product) => product.state !== 'ACTIVE'),
      );
      return !(isEmpty(category.children) ? allProductsInactive : allProductsInactive && allChildrenInactive);
    });
    setCategories(filteredCategories);
  }, [participant]);

  const renderProducts = (products: any) => {
    return products?.map((product: any) => (
      <div key={product.name} className="grid">
        <ListProduct
          key={product.id}
          product={product}
          orderItem={order?.items?.find((item) => item.productId === product.productId)}
        />
      </div>
    ));
  };

  const flattenCategories = (categories) => {
    return categories.reduce((acc, category) => {
      return acc.concat(
        { ...category, isChildren: false },
        category.children.map((child) => ({ ...child, isChildren: true })),
      );
    }, []);
  };

  const allCategories = flattenCategories(categories);

  const generateGroupedUsers = () => {
    const groupedCategories = groupBy(allCategories, (a: any) => a.id);
    const groupCounts = Object.values(groupedCategories).map((users: any) => users.length);
    return { groupCounts };
  };
  const { groupCounts } = generateGroupedUsers();

  const handleRangeChanged = ({ startIndex }) => {
    if (isScrolling) {
      setActiveIndex(startIndex);
    }
  };

  const onSelectCategory = (index: number) => {
    virtuoso.current.scrollToIndex({
      index: index,
    });
    setActiveIndex(index);
  };

  const onScroll = () => {
    window.scrollTo(0, 210);
  };

  const onScrolling = (status: boolean) => {
    setIsScrolling(status);
  };

  return (
    <div className="grid grid-cols-12 bg-white">
      <div className="col-span-3 sm:col-span-2 h-full gap-1 text-start bg-gray-700 dark:bg-gray-700">
        {groupCounts
          .reduce(
            ({ firstItemsIndexes, offset }, count) => {
              return {
                firstItemsIndexes: [...firstItemsIndexes, offset],
                offset: offset + count,
              };
            },
            { firstItemsIndexes: [], offset: 0 },
          )
          .firstItemsIndexes.map((itemIndex, index) => (
            <div
              className={` grid ${` ${activeIndex === itemIndex ? ' ' : 'bg-white'}`} text-start dark:bg-gray-700 `}
              key={itemIndex}
            >
              <div
                className={`cursor-pointer py-4 text-center   ${
                  allCategories[itemIndex].isChildren ? '   ' : ''
                }  text-sm  ${
                  activeIndex === itemIndex
                    ? ` ${
                        activeIndex === 0
                          ? 'bg-white text-current  rounded-bl-xl animate-quantity-change'
                          : 'bg-white text-current  rounded-l-xl animate-quantity-change'
                      } `
                    : `  ${
                        activeIndex === itemIndex - 1
                          ? ' rounded-tr-2xl text-white bg-gray-700  '
                          : ` ${
                              activeIndex === itemIndex + 1
                                ? ' rounded-br-lg text-white bg-gray-700 '
                                : 'text-white bg-gray-700 '
                            }   `
                      }  `
                } `}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory(itemIndex);
                }}
              >
                <span className=" text-center">{allCategories[index].name}</span>
              </div>
              {activeIndex !== index && <div className=" " />}
            </div>
          ))}
      </div>
      <div
        className="col-span-9 sm:col-span-10 h-full bg-white overflow-y-auto dark:bg-gray-700"
        style={
          imgUrl
            ? {
                backgroundImage: `url(${imgUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
              }
            : {
                background: 'white',
              }
        }
      >
        <GroupedVirtuoso
          ref={virtuoso}
          onScroll={onScroll}
          groupCounts={groupCounts}
          isScrolling={onScrolling}
          rangeChanged={handleRangeChanged}
          groupContent={(index) => {
            return (
              <div className=" bg-white py-2 shadow-lg border-t dark:bg-gray-700 dark:text-white border-gray-100 flex items-center text-center place-content-center text-sm text-gray-500  ">
                • {allCategories[index].name} •
              </div>
            );
          }}
          itemContent={(index) => (
            <div
              style={{ padding: '0.5rem 1rem' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
            >
              {renderProducts(allCategories[index]?.products)}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Index;
