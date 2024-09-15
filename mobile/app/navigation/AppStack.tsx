import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import { View, StyleSheet } from "react-native";

import Header from "app/components/Header";
import MainScreen from "../screens/MainScreen";
import Teascreen from "../screens/TeasScreen";
import OrdersScreen from "../screens/OrdersScreen";
import CartScreen from "app/screens/CartScreen";
import ProfileStack from "./ProfileStack";
import colors from "../utils/colors";
import { useAppContext } from "../context/AppContext";

const Tab = createBottomTabNavigator();

export default function AppStackNavigator() {
  const { state } = useAppContext();

  return (
    <View style={styles.container}>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Main") {
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
            } else if (route.name === "Cart") {
              return (
                <MaterialCommunityIcons
                  name="cart-outline"
                  size={28}
                  color={color}
                />
              );
            }
            return null;
          },
          tabBarStyle: {
            backgroundColor: colors.lightBeige,
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
          tabBarActiveTintColor: colors.darkGreen,
          tabBarInactiveTintColor: colors.lightGreen,
        })}
      >
        {state.user?.role === "user" && (
          <Tab.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        )}
        <Tab.Screen
          name="Teas"
          component={Teascreen}
          options={{ headerShown: false }}
        />
        {state.user?.role === "user" && (
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{ headerShown: false }}
          />
        )}
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height container to allow content below header
  },
  contentContainer: {
    flex: 1, // Content takes up the rest of the space after the header
  },
});
