import { gql } from "@apollo/client";

export const MUTATION_INSERT_ORDER = gql`
  mutation InsertOrder(
    $totalPrice: numeric!
    $userId: uuid!
    $orderItems: [orderitems_insert_input!]!
  ) {
    insert_orders_one(
      object: {
        total_price: $totalPrice
        user_id: $userId
        orderitems: { data: $orderItems }
      }
    ) {
      id
      total_price
      user_id
      orderitems {
        total_price
        tea_id
        quantity
        price_per_unit
        order_id
      }
    }
  }
`;
