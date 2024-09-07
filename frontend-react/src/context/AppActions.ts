// Define action types
export const SET_USER = "SET_USER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_LOADING = "SET_LOADING";

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
  price: number;
}) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId: string) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});
