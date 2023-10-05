import React, { useEffect, useState } from 'react';
import { GET_BANNERS } from '../../graphql/query';
import { BannerSystem, BannerType, IBanner } from '../../types';
import { useLazyQuery } from '@apollo/client';
import { Carousel, Modal } from 'flowbite-react';
import Image from 'next/image';
import fallback from '../../assets/images/noImage.jpg';
import { imageLoader } from '../../tools/image';
import { isEmpty } from 'lodash';
import { customThemeWaiterModal } from '../../../styles/themes';
import { CgClose } from 'react-icons/cg';

type Props = {
  types: BannerType[];
};

const SmartBannerModal = ({ types }: Props) => {
  const [visible, setVisible] = useState(false);

  const checkStorage = () => {
    const showBanner = JSON.parse(localStorage.getItem('banner'));
    if (typeof showBanner === 'boolean') {
      return showBanner;
    } else {
      return true;
    }
  };

  const [getBanners, { data }] = useLazyQuery<{ getBanners: IBanner[] }>(GET_BANNERS, {
    onCompleted(data) {
      if (data.getBanners.filter((item) => types.includes(item.type)).length > 0) {
        setVisible(true);
      }
      localStorage.setItem('banner', JSON.stringify(false));
    },
  });

  const onClose = () => {
    setVisible(false);
  };

  const getItems = () => {
    return data?.getBanners.filter((item) => types.includes(item.type)) ?? [];
  };

  useEffect(() => {
    if (checkStorage()) getBanners({ variables: { system: BannerSystem.Q } });
  }, []);

  return (
    <Modal show={visible} theme={customThemeWaiterModal} onClose={onClose} dismissible>
      <Modal.Body className="p-0 relative">
        <div
          onClick={onClose}
          className="absolute flex justify-center items-center text-white right-2 bg-[#00000025] h-7 w-7 top-2 z-10 rounded-full"
        >
          <CgClose />
        </div>
        <Carousel
          className="w-full"
          style={{ height: '614px' }}
          rightControl={getItems().length < 2 && <></>}
          leftControl={getItems().length < 2 && <></>}
        >
          {getItems().map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center justify-between hover:shadow-xl shadow-lg bg-white dark:bg-gray-700 rounded-md"
            >
              <Image
                className="rounded-md w-full"
                alt="stew"
                key={`image-${index}`}
                src={isEmpty(item.image) ? fallback.src : item.image}
                loader={imageLoader}
                width={350}
                height={615}
                priority={true}
                style={{ height: '614px', width: '100%' }}
              />
            </div>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default SmartBannerModal;
