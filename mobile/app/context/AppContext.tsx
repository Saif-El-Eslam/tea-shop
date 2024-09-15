"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { appReducer, initialState, State, Action } from "./AppReducer";
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
    const getUser = async () => {
      dispatch({ type: SET_LOADING, payload: true });

      try {
        const id = JSON.parse((await AsyncStorage.getItem("id")) || "");
        const token = JSON.parse((await AsyncStorage.getItem("token")) || "");
        const role = JSON.parse((await AsyncStorage.getItem("role")) || "");
        // const teas = await AsyncStorage.getItem("teas");

        if (token) {
          dispatch({
            type: SET_USER,
            payload: { ...state.user, token, role, id },
          });
        }
        // if (teas) {
        //   dispatch({ type: SET_PRODUCTS, payload: teas });
        // }

        console.log("USER", state.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    dispatch({ type: SET_LOADING, payload: false });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
