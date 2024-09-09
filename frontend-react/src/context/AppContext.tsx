import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, initialState, State, Action } from "./AppReducer";
import { useEffect } from "react";
import { SET_LOADING, SET_USER, SET_PRODUCTS } from "./AppActions";

// Create a context with a default value
const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// The provider component that wraps the application
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // const teas = JSON.parse(localStorage.getItem("teas") as string);

    if (token) {
      dispatch({ type: SET_USER, payload: { ...state.user, token, role } });
    }
    // if (teas) {
    //   dispatch({ type: SET_PRODUCTS, payload: teas });
    // }

    dispatch({ type: SET_LOADING, payload: false });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => React.useContext(AppContext);
