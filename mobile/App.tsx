import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client from "app/graphQL/apolloClient";
import { AppProvider } from "app/context/AppContext";
import RootNavigator from "app/navigation/RootNavigator";
import colors from "app/utils/colors";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
          <Toast />
        </NavigationContainer>
      </AppProvider>
    </ApolloProvider>
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
