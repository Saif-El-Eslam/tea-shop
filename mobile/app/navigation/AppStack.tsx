import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen";
import Teascreen from "../screens/TeasScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { RootStackParamList } from "../types/navigation";

const AppStack = createStackNavigator<RootStackParamList>();

export default function AppStackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Main" component={MainScreen} />
      <AppStack.Screen name="Teas" component={Teascreen} />
      <AppStack.Screen name="Orders" component={OrdersScreen} />
    </AppStack.Navigator>
  );
}
