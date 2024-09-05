import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Add logic to register with your API
    console.log("Register", phoneNumber, password, confirmPassword);
    // Dispatch to context if necessary
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderColor: "gray", borderWidth: 1 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
