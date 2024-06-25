import { gql } from '@apollo/client';

export const CURRENT_TOKEN = gql`
  mutation getToken($code: String, $type: ChannelType!, $token: String, $partner: PartnerAppType) {
    getToken(code: $code, type: $type, token: $token, partner: $partner) {
      token
      id
    }
  }
`;
