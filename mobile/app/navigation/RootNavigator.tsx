import React from "react";

import { useAppContext } from "../context/AppContext";
import AuthStackNavigator from "./AuthStack";
import AppStackNavigator from "./AppStack";

export default function RootNavigator() {
  const { state } = useAppContext();

  console.log(state);

  return state.user ? <AppStackNavigator /> : <AuthStackNavigator />;
}
