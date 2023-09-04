import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCallStore } from '../../contexts/call.store';
import { GET_ORDER_REVIEWS } from '../../graphql/query/order';
import { IOrderReview } from '../../types/order.review';
import { BiLike } from 'react-icons/bi';
import moment from 'moment';
import { getPayload } from '../../providers/auth';

const Index = () => {
  const { participant } = useCallStore();
  const { t } = useTranslation('language');

  var curr = new Date();
  const dateTime = moment(curr).format('dddd');

  const [orderReviews, setOrderReviews] = useState<IOrderReview[]>([]);

  const { loading } = useQuery(GET_ORDER_REVIEWS, {
    skip: participant?.channel === 'W',
    onCompleted: (data: any) => {
      setOrderReviews(data.getOrderReviewsByLimit);
    },
  });

  const getTimeForm = (props: string) => {
    if (!props) return <>{moment('12:00', 'h:mm a').format('h:mm a')}</>;
    return <>{moment(props, 'h:mm a').format('h:mm a')}</>;
  };

  const convertWeeks = (type: any) => {
    switch (type) {
      case 'Sunday':
        return (
          <span className="reviews">
            {t('mainPage.Sunday')} ({getTimeForm(participant?.branch?.timetable?.sunOpen)} -
            {getTimeForm(participant?.branch?.timetable?.sunClose)})
          </span>
        );
      case 'Monday':
        return (
          <span className="reviews">
            {t('mainPage.Monday')} ({getTimeForm(participant?.branch?.timetable?.monOpen)} -
            {getTimeForm(participant?.branch?.timetable?.monClose)})
          </span>
        );
      case 'Tuesday':
        return (
          <span className="reviews">
            {t('mainPage.Tuesday')} ({getTimeForm(participant?.branch?.timetable?.tueOpen)} -
            {getTimeForm(participant?.branch?.timetable?.tueClose)})
          </span>
        );
      case 'Wednesday':
        return (
          <span className="reviews">
            {t('mainPage.Wednesday')} ({getTimeForm(participant?.branch?.timetable?.wedOpen)} -
            {getTimeForm(participant?.branch?.timetable?.wedClose)})
          </span>
        );
      case 'Thursday':
        return (
          <span className="reviews">
            {t('mainPage.Thursday')} ({getTimeForm(participant?.branch?.timetable?.thuOpen)} -
            {getTimeForm(participant?.branch?.timetable?.thuClose)})
          </span>
        );
      case 'Friday':
        return (
          <span className="reviews">
            {t('mainPage.Friday')} ({getTimeForm(participant?.branch?.timetable?.friOpen)} -
            {getTimeForm(participant?.branch?.timetable?.friClose)})
          </span>
        );
      case 'Saturday':
        return (
          <span className="reviews">
            {t('mainPage.Saturday')} ({getTimeForm(participant?.branch?.timetable?.satOpen)} -
            {getTimeForm(participant?.branch?.timetable?.satClose)})
          </span>
        );
      default:
        return type;
    }
  };

  function reviewPrecentage() {
    if (!orderReviews) return '';
    let count = orderReviews.filter((x: any) => x.liked === 1).length;
    let percentage = (count / orderReviews.length) * 100;
    if (percentage === 0) return '';
    if (isNaN(percentage)) return '';
    return (
      <span className="flex align-center">
        <p>{t('mainPage.Review')}</p>
        {Math.floor(1) + '%'} ({orderReviews.length}) <BiLike />
      </span>
    );
  }

  return (
    <>
      <div className="absolute w-full top-20  flex  place-items-center  ">
        <img alt="logo" className="w-24 ml-5 md:w-32 lg:w-32 rounded-lg" src={participant.branch.logo} />
        <div className="ml-3">
          <span className=" flex relative  max-w-[192px] text-white text-base">
            <div className=" relative">
              <span className="align-center line-clamp-2 text-white text-base ">{participant.branch.name}</span>
            </div>
          </span>

          <span>
            {orderReviews && <div className=" text-white text-sm flex items-center">{reviewPrecentage()}</div>}
          </span>
          <span className="text-white text-sm "> {convertWeeks(dateTime)}</span>
        </div>
      </div>
    </>
  );
};

export default Index;
