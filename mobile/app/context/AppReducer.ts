import {
  SET_USER,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCTS,
  SET_LOADING,
} from "./AppActions";
import { TeaType } from "../types/types";

// Define types for User and Product
interface User {
  token: string;
  name?: string;
  role: string;
}

interface Product extends TeaType {}

export interface State {
  user: User | null;
  teas: Product[];
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  user: null,
  teas: [],
  loading: true,
};

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_PRODUCTS:
      return { ...state, teas: action.payload };
    case ADD_PRODUCT:
      return { ...state, teas: [...state.teas, action.payload] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        teas: state.teas.filter((product) => product.id !== action.payload),
      };
    default:
      return state;
  }
};
