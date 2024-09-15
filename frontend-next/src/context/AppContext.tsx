"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import { appReducer, initialState, State, Action } from "./AppReducer";
import { useEffect } from "react";
import { SET_LOADING, SET_USER } from "./AppActions";

const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    // const teas = JSON.parse(localStorage.getItem("teas") as string);
    console.log("id", id);

    if (token) {
      dispatch({ type: SET_USER, payload: { ...state.user, token, role, id } });
    }
    // if (teas) {
    //   dispatch({ type: SET_PRODUCTS, payload: teas });
    // }

    dispatch({ type: SET_LOADING, payload: false });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
