import React from 'react';
import exp from '../assets/images/banner-1.jpg';
import FeaturesCard from '../components/Cards/FeaturesCard';
import kds from '../assets/images/kds.jpg';
import krk from '../assets/images/Karaoke.jpg';
import ksk from '../assets/images/Kiosk.jpg';
import qrMenu from '../assets/images/qrmenu.jpg';

const Features = () => {
  const features = [
    {
      name: 'Караоке ном',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: krk.src,
    },
    {
      name: 'Гал тогоон удирдлагын систем (KDS)',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: kds.src,
    },
    {
      name: 'Ухаалаг QMENU',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: qrMenu.src,
    },
    {
      name: 'КИОСК - Self Ordering System',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: ksk.src,
    },
    {
      name: 'Захиалгын дэлгэц',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: exp.src,
    },
    {
      name: 'Караоке цахим QR ном',
      desc: 'Гал тогоо, текийг цэгцтэй удирдах нь таны рестораны орлого, ашигт сайнаар нөлөөлдөг',
      ImgUrl: krk.src,
    },
  ];

  return (
    <>
      <div className="leanding-normal tracking-wide bg-gray-200  dark:bg-gray-800">
        <br className="bg-gray-200 dark:bg-gray-800" />
        <div className="bg-gray-200 dark:bg-gray-800 pl-5 text-lg">Ресторан удирдлагын цогц систем</div>

        <div className="px-4 mr-1 w-full overflow-hidden  bg-gray-200  dark:bg-gray-800">
          <div
            className="carousel-items flex items-center justify-center"
            style={{ width: 'fit-content', animation: 'carouselAnim 10s infinite alternate linear' }}
          >
            {features.map((feature) => (
              <FeaturesCard key={feature.name} imgUrl={feature.ImgUrl} name={feature.name} desc={feature.desc} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
