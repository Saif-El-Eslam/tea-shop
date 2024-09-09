import {
  SET_USER,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
} from "./AppActions";
import { TeaType } from "../Types/types";

// Define types for User and Product
interface User {
  token: string;
  name?: string;
  role: string;
}

interface Product extends TeaType {}

export interface State {
  user: User | null;
  products: Product[];
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  user: null,
  products: [],
  loading: true,
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
