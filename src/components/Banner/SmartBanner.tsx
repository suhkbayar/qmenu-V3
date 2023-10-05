import React from 'react';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import fallback from '../../assets/images/noImage.jpg';
import { imageLoader } from '../../tools/image';
import { BannerSystem, BannerType, IBanner } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_BANNERS } from '../../graphql/query';
import { Empty } from '..';

interface Props {
  types: BannerType[];
  empty?: boolean;
}

const SmartBanner = ({ types, empty }: Props) => {
  const { data, loading } = useQuery<{ getBanners: IBanner[] }>(GET_BANNERS, {
    variables: { system: BannerSystem.Q, types: [BannerType.M, BannerType.E, BannerType.A] },
  });

  const onClickItem = (item: IBanner) => {
    let url = null;
    const actions = item.actions;
    if (!actions || !actions[0]?.url || [BannerType.P].includes(item.type)) return;
    url = actions[0].url;
    window.open(url, '_blank');
  };

  if (!data?.getBanners || data?.getBanners.length < 1) return <></>;

  if (!loading && isEmpty(data?.getBanners)) {
    if (empty) return <Empty />;
    return <></>;
  }

  return (
    <div className="w-full p-2">
      <Carousel className="w-full" style={{ height: types.includes(BannerType.A) ? '228px' : '172px' }}>
        {data?.getBanners
          .filter((item) => types.includes(item.type))
          .map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center justify-between hover:shadow-xl shadow-lg bg-white dark:bg-gray-700 rounded-md"
            >
              <Image
                onClick={() => onClickItem(item)}
                className="rounded-md w-full"
                alt="stew"
                key={index}
                src={isEmpty(item.image) ? fallback.src : item.image}
                loader={imageLoader}
                width={350}
                height={172}
                priority={true}
                style={{ height: types.includes(BannerType.A) ? '228px' : '172px' }}
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default SmartBanner;
