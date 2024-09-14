import { gql } from "@apollo/client";

export const QUERY_ORDERS = gql`
  query QUERY_ORDERS @cached {
    orders {
      id
      orderitems {
        quantity
        price_per_unit
        total_price
        tea {
          name
        }
      }
      user {
        name
      }
      total_price
      createdAt
    }
  }
`;
