import { gql } from "@apollo/client";

export const QUERY_ORDERS = gql`
  query QUERY_ORDERS @cached {
    orders(order_by: { createdAt: desc }) {
      id
      total_price
      createdAt
      orderitems_aggregate {
        aggregate {
          sum {
            quantity
          }
        }
      }
    }
  }
`;

export const QUERY_ORDER_DETAILS = gql`
  query QUERY_ORDER_DETAILS($id: uuid!) @cached {
    orders_by_pk(id: $id) {
      id
      orderitems {
        price_per_unit
        quantity
        total_price
        tea {
          name
        }
      }
      total_price
      user_id
    }
  }
`;
