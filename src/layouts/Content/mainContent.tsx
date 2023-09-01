import { useQuery } from '@apollo/client';
import React from 'react';
import RestaurantsCard from '../../components/Cards/RestaurantsCard';
import Carousels from '../../components/Carousel/Carousel';
import SearchBarRestaurants from '../../components/SearchBar/SearchBarRestaurants';
import Sidebars from '../../components/SibeBar/SibeBar';
import Skelton from '../../components/Skelton/Skelton';
import { GET_BRANCHES } from '../../graphql/query/branch';

const Content = () => {
  const { loading, error, data } = useQuery(GET_BRANCHES);

  if (loading) return <Skelton />;

  return (
    <>
      <Carousels />
      <SearchBarRestaurants />
      {data && (
        <div className="relative md:flex">
          <div className="hidden md:flex">
            <Sidebars branches={data.getParticipants.flatMap((item) => item.branch)} />
          </div>
          <RestaurantsCard
            participants={data.getParticipants}
            branches={data.getParticipants.flatMap((item) => item.branch).sort((a: any, b: any) => 0.5 - Math.random())}
          />
        </div>
      )}
    </>
  );
};

export default Content;
