import React from "react";
import MainScreen from "../screens/MainScreen";
import Teascreen from "../screens/TeasScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";

import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

export default function AppStackNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={32} color={color} />;
          } else if (route.name === "Teas") {
            return (
              <MaterialCommunityIcons
                name="tea-outline"
                size={32}
                color={color}
              />
            );
          } else if (route.name === "Orders") {
            return <MaterialIcons name="list-alt" size={32} color={color} />;
          } else if (route.name === "Profile") {
            return <Octicons name="person" size={32} color={color} />;
          }

          return null;
        },
        tabBarStyle: {
          backgroundColor: colors.yellow,
          height: 70,

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: colors.lightBeige,
        tabBarInactiveTintColor: colors.darkGreen,
      })}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Teas"
        component={Teascreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={MainScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
