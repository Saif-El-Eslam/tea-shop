import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";

import { RegisterScreenNavigationProp } from "app/types/navigation";
import { useAppContext } from "../context/AppContext";
import { setLoading } from "../context/AppActions";
import { register } from "../services/AuthService";
import colors from "app/utils/colors";
import Notify from "app/utils/Notify";

const RegisterScreen = () => {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async (e: any) => {
    if (!name || !phoneNumber || !password || !confirmPassword) {
      Notify.error("All fields are required");
      return;
    }

    try {
      dispatch(setLoading(true));
      await register(name, phoneNumber, password, confirmPassword);
      navigation.navigate("Login");
    } catch (error: any) {
      if (error?.errors) {
        return Notify.error(error?.errors[0]?.msg);
      }
      Notify.error(error.error || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Join Us Now</Text>
        <Text style={styles.subHeaderText}>
          Steeped in tradition, brewed for today.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Pressable
          style={styles.button}
          onPress={handleRegister}
          disabled={state.loading}
        >
          {state.loading ? (
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Registering </Text>
              <DotIndicator count={3} size={6} color={colors.lightBeige} />
            </View>
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signUpText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 16,
    color: "gray",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 75,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "gray",
    fontSize: 14,
  },
  signUpText: {
    color: colors.brown,
    fontSize: 14,
    marginLeft: 4,
  },
});

export default RegisterScreen;
