import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";

import MainScreen from "../screens/MainScreen";
import Teascreen from "../screens/TeasScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

export default function AppStackNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <AntDesign name="home" size={28} color={color} />;
          } else if (route.name === "Teas") {
            return (
              <MaterialCommunityIcons
                name="tea-outline"
                size={28}
                color={color}
              />
            );
          } else if (route.name === "Orders") {
            return <MaterialIcons name="list-alt" size={28} color={color} />;
          } else if (route.name === "Profile") {
            return <Octicons name="person" size={28} color={color} />;
          }
          // <MaterialCommunityIcons name="cart-outline" size={24} color="black" />
          return null;
        },
        tabBarStyle: {
          backgroundColor: colors.yellow,
          height: 80,
          paddingTop: 15,

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          paddingBottom: 15,
        },
        tabBarActiveTintColor: "#3a6e45",
        tabBarInactiveTintColor: "#6b8a72",
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
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
