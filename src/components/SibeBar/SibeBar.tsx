import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { IoMdRestaurant } from 'react-icons/io';
import { MdDinnerDining, MdOutlineAvTimer } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { foodTypes } from '../../mock';
import RestaurantsCard from '../Cards/RestaurantsCard';
import { IBranch } from '../../types/branch';
import MiniSearch from 'minisearch';
import { getOpenOrClosedBranches } from '../../tools/timeTable';
import moment from 'moment';
import { IFilterDeliveryType, IFilterRestaurantTypes, IOpenOrClose } from '../../types';

type Props = {
  branches: IBranch[];
};

let resultBranches: any[] = [];

const Sidebars = ({ branches }: Props) => {
  const { t } = useTranslation('language');
  const [openOrClose, setOpenOrClose] = useState<IOpenOrClose[]>([]);
  const [restaurantTypes, setRestaurantTypes] = useState<IFilterRestaurantTypes[]>([]);
  const [deliveryType, setDeliveryType] = useState<IFilterDeliveryType[]>([]);

  var curr = new Date();
  const dateTime = moment(curr).format('dddd');

  let miniSearch = new MiniSearch({
    fields: ['name', 'description', 'type'],
  });

  useEffect(() => {
    if (branches) {
      resultBranches.push(...branches);
      miniSearch.addAll(resultBranches);
      setOpenOrClose([
        {
          key: '1',
          name: 'Open',
          count: getOpenOrClosedBranches(dateTime, resultBranches, true).length,
          field: 'open',
        },
        {
          key: '2',
          name: 'Closed',
          count: getOpenOrClosedBranches(dateTime, resultBranches, false).length,
          field: 'closed',
        },
      ]);
      setDeliveryType([
        {
          key: '1',
          name: 'Yes',
          count: resultBranches.filter((arr) => arr.services.includes('Delivery')).length,
          field: 'yes',
        },
        {
          key: '2',
          name: 'No',
          count: resultBranches.filter((arr) => !arr.services.includes('Delivery')).length,
          field: 'no',
        },
      ]);
      setRestaurantTypes([
        {
          key: '1',
          field: 'Restaurant',
          count: miniSearch.search('Restaurant', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '2',
          field: 'Canteen',
          count: miniSearch.search('Canteen', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '3',
          field: 'Pub',
          count: miniSearch.search('Pub', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '4',
          field: 'Cafe',
          count: miniSearch.search('Cafe', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '5',
          field: 'Club',
          count: miniSearch.search('Club', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '6',
          field: 'CoffeeShop',
          count: miniSearch.search('CoffeeShop', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '7',
          field: 'Karaoke',
          count: miniSearch.search('Karaoke', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '8',
          field: 'Hotel',
          count: miniSearch.search('Hotel', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '9',
          field: 'Resort',
          count: miniSearch.search('Resort', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '10',
          field: 'Warehouse',
          count: miniSearch.search('Warehouse', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
        {
          key: '11',
          field: 'Other',
          count: miniSearch.search('Other', { prefix: true, boost: { name: 1 }, fuzzy: 0.2 }).length,
        },
      ]);
    }
  }, [branches]);

  return (
    <>
      <Sidebar aria-label="Sidebar with multi-level dropdown example w-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              className="font-bold text-sm"
              label={t('mainPage.RestaurantType')}
              icon={IoMdRestaurant}
              open
            >
              <Sidebar.Item label={branches.length}>{t('mainPage.All')}</Sidebar.Item>
              {restaurantTypes.map((item, index) => (
                <Sidebar.Item key={index} label={item.count}>
                  {t(`mainPage.${item.field}`)}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse className="font-bold  text-sm" label={t('mainPage.Meals')} icon={MdDinnerDining} open>
              {foodTypes.map((food) => (
                <Sidebar.Item key={food.name} label={food.count}>
                  <p>{food.name}</p>
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse className="font-bold  text-sm" label={t('mainPage.Open')} icon={MdOutlineAvTimer} open>
              {openOrClose.map((item, index) => (
                <Sidebar.Item key={index} label={item.count}>
                  {t(`mainPage.${item.name}`)}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>

            <Sidebar.Collapse
              className="font-bold  text-sm"
              label={t('mainPage.FreeShipping')}
              icon={TbTruckDelivery}
              open
            >
              {deliveryType.map((item, index) => (
                <Sidebar.Item key={index} label={item.count}>
                  {t(`mainPage.${item.name}`)}
                </Sidebar.Item>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default Sidebars;
