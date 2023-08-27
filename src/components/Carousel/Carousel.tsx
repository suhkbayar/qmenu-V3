import React from 'react';
import { Carousel } from 'flowbite-react';
import banner1 from '../../assets/images/banner-1.jpg';
import banner2 from '../../assets/images/banner-2.jpg';
import banner3 from '../../assets/images/banner-3.jpg';

const Carousels = () => {
  return (
    <>
      <div className="relative h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img src={banner1.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
          <img src={banner2.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
          <img src={banner3.src} alt="..." className="block w-full h-full bg-cover bg-center object-cover" />
        </Carousel>
      </div>
    </>
  );
};

export default Carousels;
