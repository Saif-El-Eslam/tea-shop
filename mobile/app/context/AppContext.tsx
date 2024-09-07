"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import { appReducer, initialState, State, Action } from "./AppReducer";
import { SET_LOADING, SET_USER } from "./AppActions";

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
    const getUser = async () => {
      dispatch({ type: SET_LOADING, payload: true });

      try {
        const user = await AsyncStorage.getItem("token");
        if (user) {
          dispatch({ type: SET_USER, payload: JSON.parse(user) });
        }
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

// Custom hook to use the AppContext
export const useAppContext = () => React.useContext(AppContext);
