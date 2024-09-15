import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

import { LoginScreenNavigationProp } from "app/types/navigation";
import { useAppContext } from "app/context/AppContext";
import { setUser, setLoading } from "app/context/AppActions";
import { login } from "app/services/AuthService";
import colors from "app/utils/colors";
import Notify from "app/utils/Notify";

const logoImage = require("app/assets/tea-shop-logo.png");

const screenHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  const { state, dispatch } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Notify.error("All fields are required");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await login(phoneNumber, password);

      const decoded: any = jwtDecode(res.token);
      await AsyncStorage.setItem("id", JSON.stringify(decoded.id));
      await AsyncStorage.setItem("role", JSON.stringify(decoded.role));
      await AsyncStorage.setItem("token", JSON.stringify(res.token));

      dispatch(
        setUser({
          ...state.user,
          token: res.token,
          role: res.role,
          id: decoded.id,
        })
      );
      res.role === "admin"
        ? navigation.navigate("Teas")
        : navigation.navigate("Main");
    } catch (error: any) {
      if (error?.errors) {
        return Notify.error(error?.errors[0]?.msg);
      }
      if (error?.error) {
        return Notify.error(error?.error);
      }
      Notify.error(error || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.image} resizeMode="contain" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome back</Text>
        <Text style={styles.subHeaderText}>
          Welcome back! Please enter your details.
        </Text>
      </View>
      <View style={styles.formContainer}>
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
        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={state.loading}
        >
          {state.loading ? (
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Logging in</Text>
              <DotIndicator
                count={3}
                size={6}
                color={colors.lightBeige}
                style={styles.indecator}
              />
            </View>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </Pressable>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>Sign up for free!</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: screenHeight * 0.25,
    // maxHeight: 150, /
    marginBottom: 20,
    flex: 1,
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
    justifyContent: "center",
    marginVertical: 75,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.darkGray,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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
    color: colors.lightBeige,
    fontSize: 16,
  },
  indecator: {},
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

export default LoginScreen;
