import React from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {
  // setTimeout(async () => {
  //   await AsyncStorage.removeItem("token");
  // }, 1000);

  return (
    <View>
      <Text>Main Page</Text>
    </View>
  );
};

export default MainScreen;
