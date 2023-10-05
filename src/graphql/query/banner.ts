import { gql } from '@apollo/client';
import { BANNER_FIELDS } from '../fragment';

export const GET_BANNERS = gql`
  query getBannersByBranch {
    getBannersByBranch {
      ...BannerFields
    }
  }
  ${BANNER_FIELDS}
`;
