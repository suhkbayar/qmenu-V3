import React, { useRef, useEffect } from 'react';
import ListSkelton from '../Skelton/ListSkelton';
import { isEmpty, groupBy } from 'lodash';
import { GroupedVirtuoso } from 'react-virtuoso';
import { EmtySong } from '..';

type Props = {
  songs: any[];
  loading: boolean;
};

const Index = ({ songs, loading }: Props) => {
  const virtuoso = useRef<any>(null);

  const onScroll = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    return () => {
      if (virtuoso.current) {
        virtuoso.current.scrollToIndex({
          index: 0,
        });
      }
    };
  }, []);

  if (loading) return <ListSkelton />;

  if (isEmpty(songs)) return <EmtySong />;

  const generateGroupedUsers = () => {
    const sortedLists = songs;
    const groupedUsers = groupBy(songs, (a: any) => a.name[0]);
    const groupCounts = Object.values(groupedUsers).map((users: any) => users.length);
    const groups = Object.keys(groupedUsers);
    return { sortedLists, groupCounts, groups };
  };

  const { sortedLists, groupCounts, groups } = generateGroupedUsers();

  return (
    <>
      <div className="p-2 block  xl:flex place-content-center ">
        <div style={{ display: 'flex' }} className="xl:w-2/4">
          <div style={{ flex: 1 }}>
            {groupCounts && (
              <GroupedVirtuoso
                ref={virtuoso}
                onScroll={onScroll}
                style={{ height: 'calc(104% - 8px)' }}
                groupCounts={groupCounts}
                groupContent={(index) => {
                  return (
                    <div key={index} className="bg-grayish text-white rounded rounded-lg pl-2 ">
                      {groups[index]}
                    </div>
                  );
                }}
                itemContent={(index) => {
                  return (
                    <div className="flex place-content-between place-items-center bg-white  mb-2 py-2 px-4 drop-shadow-lg rounded rounded-lg dark:bg-gray-800">
                      <div>
                        <h4>{sortedLists[index].name}</h4>
                        <p>{sortedLists[index].artist}</p>
                      </div>
                      <div>
                        <div className="font-semibold bg-current text-white p-2 rounded-xl ">
                          {sortedLists[index].code}
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </div>
          <div className=" w-8 overflow-auto h-[70vh] ">
            <ul className=" text-center list-none leading-6">
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
                  <li key={itemIndex}>
                    <div
                      className="w-6 ml-2 transform text-center bg-transparent text-gray1 text-sm hover:bg-current transition duration-500 hover:text-white hover:w-6 hover:text-base hover:rounded-xl "
                      onClick={(e) => {
                        e.preventDefault();
                        virtuoso.current.scrollToIndex({
                          index: itemIndex,
                        });
                      }}
                    >
                      {groups[index]}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
