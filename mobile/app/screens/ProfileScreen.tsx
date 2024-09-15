import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { LoginScreenNavigationProp } from "app/types/navigation";
import { useAppContext } from "../context/AppContext";
import { setUser, setProducts, setRefetchOrders } from "../context/AppActions";

const { width } = Dimensions.get("window");
const UserIcon = require("app/assets/user.png");

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { dispatch, state } = useAppContext();
  const [slideAnim] = useState(new Animated.Value(width));
  const userName = state?.user?.name || "User Name";

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    state?.user?.role === "admin"
      ? navigation.navigate("Teas")
      : navigation.navigate("Main");
    dispatch(setUser(null));
    dispatch(setProducts([]));
    dispatch(setRefetchOrders(true));

    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("teas");
  };

  return (
    <Animated.View
      style={[
        styles.profileContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.profileHeader}>
        <Image source={UserIcon} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.welcome}>Welcome,</Text>
          <Text style={styles.profileName}>{userName}</Text>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Contact")}
        >
          <Text style={styles.tabText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.tabText}>About</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: "#F7F4E3",
    padding: 20,
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#D0E6A5",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    color: "#555",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tabItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D0E6A5",
  },
  tabText: {
    fontSize: 18,
    color: "#556B2F",
    fontWeight: "bold",
  },
  logoutContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#D0E6A5",
  },
  logoutButton: {
    paddingVertical: 15,
  },
  logoutText: {
    color: "#8B4513",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
