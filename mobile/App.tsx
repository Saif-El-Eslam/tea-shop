import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./app/context/AppContext";
import RootNavigator from "./app/navigation/RootNavigator";
import colors from "./app/utils/colors";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
        <Toast />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBeige,
    alignItems: "center",
    justifyContent: "center",
  },
});
