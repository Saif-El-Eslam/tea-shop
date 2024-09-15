import {
  SET_USER,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
  SET_REFETCH_ORDERS,
  Add_CART,
  REMOVE_CART,
  SET_CART,
} from "./AppActions";
import { TeaType } from "../types/types";

interface User {
  id: string;
  token: string;
  name?: string;
  role: string;
}

interface Product extends TeaType {}

interface CartItem {
  productId: string;
  quantityInCart: number;
  subTotal: number;
  price_per_unit: number;
}

export interface State {
  user: User | null;
  teas: Product[];
  cart: CartItem[];
  loading: boolean;
  refetchOrders: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  user: null,
  teas: [],
  cart: [],
  loading: true,
  refetchOrders: false,
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_REFETCH_ORDERS:
      return { ...state, refetchOrders: action.payload };
    case SET_PRODUCTS:
      return { ...state, teas: action.payload };
    case ADD_PRODUCT:
      return { ...state, teas: [...state.teas, action.payload] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        teas: state.teas.filter((product) => product.id !== action.payload),
      };
    case Add_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantityInCart: item.quantityInCart + 1,
              subTotal: item.subTotal + item.price_per_unit,
            };
          }
          return item;
        });

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              productId: action.payload.productId,
              quantityInCart: 1,
              subTotal: parseFloat(action.payload.price_per_unit),
              price_per_unit: parseFloat(action.payload.price_per_unit),
            },
          ],
        };
      }
    case REMOVE_CART:
      const itemIndex = state.cart.findIndex(
        (item) => item.productId === action.payload
      );

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];

        if (item.quantityInCart > 1) {
          return {
            ...state,
            cart: state.cart.map((cartItem, index) => {
              if (index === itemIndex) {
                return {
                  ...cartItem,
                  quantityInCart: cartItem.quantityInCart - 1,
                  subTotal: cartItem.subTotal - cartItem.price_per_unit,
                };
              }
              return cartItem;
            }),
          };
        } else {
          return {
            ...state,
            cart: state.cart.filter(
              (cartItem) => cartItem.productId !== action.payload
            ),
          };
        }
      }

      return state;
    case SET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
