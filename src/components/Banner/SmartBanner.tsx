import React, { useState } from 'react';
import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import { isEmpty } from 'lodash';
import fallback from '../../assets/images/noImage.jpg';
import { imageLoader } from '../../tools/image';
import { BannerType, IBanner } from '../../types';
import { useQuery } from '@apollo/client';
import { GET_BANNERS } from '../../graphql/query';
import { Empty } from '..';
import { shuffleArray } from '../../utils';

interface Props {
  types: BannerType[];
  empty?: boolean;
}

const SmartBanner = ({ types, empty }: Props) => {
  const [banners, setBanners] = useState([]);
  const { loading } = useQuery<{ getBanners: IBanner[] }>(GET_BANNERS, {
    fetchPolicy: 'cache-first',
    onCompleted(data) {
      setBanners(shuffleArray(data.getBanners.filter((item) => types.includes(item.type))));
    },
  });

  const onClickItem = (item: IBanner) => {
    let url = null;
    const actions = item.actions;
    if (!actions || !actions[0]?.url || [BannerType.P].includes(item.type)) return;
    url = actions[0].url;
    window.open(url, '_blank');
  };

  if (loading) return <></>;

  if (!loading && isEmpty(banners)) {
    if (empty) return <Empty />;
    return <></>;
  }

  return (
    <div className="w-full p-2 sm:w-2/3 md:w-full">
      <Carousel
        className="w-full h-[50.7vw] sm:h-[33vw] md:h-[30vw] xl:h-[15vw]"
        leftControl={banners.length < 2 && <></>}
        rightControl={banners.length < 2 && <></>}
        indicators={banners.length > 1}
      >
        {banners.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center justify-between hover:shadow-xl shadow-lg bg-white dark:bg-gray-700 rounded-md "
          >
            <Image
              onClick={() => onClickItem(item)}
              className="rounded-md w-full"
              alt="stew"
              key={`image-${index}`}
              src={isEmpty(item.image) ? fallback.src : item.image}
              loader={imageLoader}
              width={350}
              height={types.includes(BannerType.A) ? 228 : 172}
              priority={true}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SmartBanner;
