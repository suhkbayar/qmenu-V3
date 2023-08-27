import { gql } from '@apollo/client';
import { TABLE_FIELDS, TRANSACTION_FIELDS } from '../fragment';
import { CHARGES_FIELDS, DISCOUNTS_FIELDS, ORDER_FIELDS, ORDER_ITEM_FIELDS, ORDER_LOYALTY_FIELDS } from '../query';

export const ON_TRACK_ORDER = gql`
  subscription onTrackOrder($customer: ID!) {
    onTrackOrder(customer: $customer) {
      branch
      customer
      event
      id
      order {
        ...OrderFields
        items {
          ...OrderItemFields
        }
        discounts {
          ...DiscountsFields
        }
        charges {
          ...ChargesFields
        }
        transactions {
          ...TransactionFields
        }
        loyalties {
          ...OrderLoyaltyFields
        }
        table {
          ...TableFields
        }
      }
    }
  }
  ${TABLE_FIELDS}
  ${ORDER_FIELDS}
  ${DISCOUNTS_FIELDS}
  ${CHARGES_FIELDS}
  ${ORDER_ITEM_FIELDS}
  ${TRANSACTION_FIELDS}
  ${ORDER_LOYALTY_FIELDS}
`;
