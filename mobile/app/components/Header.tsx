import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Steep & Sip</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#556B2F",
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Header;
