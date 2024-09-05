import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAppContext } from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../types/navigation";

const LoginScreen = () => {
  const { dispatch } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Add logic to authenticate with your API
    console.log("Login", email, password);
    // dispatch({ type: "LOGIN" });
    navigation.navigate("Register");
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
