import React, { useState } from 'react';
import { IBranch } from '../../types/branch';
import Pagination from '../Pagination/Pagination';
import { AiFillStar } from 'react-icons/ai';
import dinnig from '../../assets/services/Restaurant.png';
import takeAway from '../../assets/services/Pickup.png';
import preOrder from '../../assets/services/Clock.png';
import delivery from '../../assets/services/Delivery.png';
import moment from 'moment';
import { DayOfWeek } from '../../constants/constant';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

type Props = {
  branches: IBranch[];
  participants: any[];
};

const RestaurantsCard = ({ branches, participants }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [cardsPerPage] = useState(12);
  const { t } = useTranslation('language');

  var curr = new Date();

  const dateTime = moment(curr).format('dddd');

  const services = [
    {
      name: 'Dining',
      url: dinnig.src,
    },
    {
      name: 'TakeAway',
      url: takeAway.src,
    },

    {
      name: 'PreOrder',
      url: preOrder.src,
    },
    {
      name: 'Delivery',
      url: delivery.src,
    },
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = branches.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onDetail = (id: string) => {
    const participant = participants.find((participant) => participant.branch.id === id);
    router.push(`restaurant?id=${participant.id}`);
  };

  return (
    <>
      <div className="antialiased  bg-gray-200 dark:bg-gray-800  text-gray-900 font-sans p-6">
        <div className="container mx-auto ">
          <div className="flex flex-wrap -mx-4 ">
            {currentCards.map((branch) => {
              const dayOfWeek = DayOfWeek[dateTime];

              let isOpen = branch.timetable[dayOfWeek];

              let open =
                'absolute z-10 top-4 bg-success text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-e dark:bg-success';
              let closed =
                'absolute z-10 top-4 bg-current text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-e dark:bg-current';

              const classes = isOpen ? open : closed;
              const text = isOpen ? t('mainPage.Open') : t('mainPage.Closed');

              return (
                <div
                  key={branch.id}
                  onClick={() => onDetail(branch.id)}
                  className="w-1/2 sm:w-1/2 md:w-1/3 xl:w-1/4 p-2 cursor-pointer "
                >
                  <div
                    key={branch.id}
                    className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                  >
                    <div className="relative pb-48 overflow-hidden">
                      <span key={branch.id} className={classes}>
                        {text}
                      </span>
                      <img className="absolute inset-0 h-full w-full object-cover" src={branch.logo} alt="" />
                    </div>
                    <div className="px-4 pt-1">
                      <h2 className="block-ellipsis-1  flex place-items-center  mt-2 mb-1 font-bold dark:text-black ">
                        {branch.name}
                      </h2>
                      <p className=" block-ellipsis-2 text-sm text-gray1 dark:text-gray1 ">{branch.description}</p>
                    </div>
                    <div className="p-2 px-4 pb-4 flex justify-between ">
                      <div className="flex items-center gap-1 text-sm">
                        <AiFillStar fill="#facc15" />
                        2.3
                      </div>
                      <div className="flex items-center gap-1">
                        {branch.services.map((item) => (
                          <img width={24} key={item} src={services.find((val) => val.name === item).url} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          cardsPerPage={cardsPerPage}
          totalCards={branches.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default RestaurantsCard;
