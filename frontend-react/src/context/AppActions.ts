// Define action types
export const SET_USER = "SET_USER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_LOADING = "SET_LOADING";
export const SET_PRODUCTS = "SET_PRODUCTS";

// Action creators
export const setUser = (
  user: { token: string; name?: string; role?: string } | null
) => ({
  type: SET_USER,
  payload: user,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
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
