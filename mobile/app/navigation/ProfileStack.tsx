import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import ContactScreen from "../screens/ContactScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
