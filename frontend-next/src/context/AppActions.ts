// Define action types
export const SET_USER = "SET_USER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_LOADING = "SET_LOADING";
export const SET_REFETCH_ORDERS = "SET_REFETCH_ORDERS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const Add_CART = "Add_CART";
export const REMOVE_CART = "REMOVE_CART";
export const SET_CART = "SET_CART";

// Action creators
export const setUser = (
  user: { token: string; name?: string; role?: string; id?: string } | null
) => ({
  type: SET_USER,
  payload: user,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setRefetchOrders = (refetch: boolean) => ({
  type: SET_REFETCH_ORDERS,
  payload: refetch,
});

export const addProduct = (product: {
  id: string;
  name: string;
  description: string;
  price_per_unit: number;
  quantity: number;
}) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const setProducts = (
  products: {
    id: string;
    name: string;
    description: string;
    price_per_unit: number;
    quantity: number;
  }[]
) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const removeProduct = (productId: string) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const addCart = (cartItem: {
  productId: string;
  price_per_unit: number;
}) => ({
  type: Add_CART,
  payload: cartItem,
});

export const removeCart = (productId: string) => ({
  type: REMOVE_CART,
  payload: productId,
});

export const setCart = (
  cart: {
    productId: string;
    price_per_unit: number;
    quantityInCart: number;
    subTotal: number;
  }[]
) => ({
  type: SET_CART,
  payload: cart,
});
