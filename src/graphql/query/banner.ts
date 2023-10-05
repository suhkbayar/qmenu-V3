import { gql } from '@apollo/client';
import { BANNER_FIELDS } from '../fragment';

export const GET_BANNERS = gql`
  query getBanners($system: BannerSystem!) {
    getBanners(system: $system) {
      ...BannerFields
    }
  }
  ${BANNER_FIELDS}
`;
