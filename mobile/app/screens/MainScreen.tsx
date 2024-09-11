// import React from "react";
// import { View, Text } from "react-native";

// const MainScreen = () => {
//   return (
//     <View>
//       <Text>Main Page</Text>
//     </View>
//   );
// };

// export default MainScreen;
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Using react-navigation

import { LoginScreenNavigationProp } from "app/types/navigation";
const Home1 = require("../assets/home-1.png");
const Home2 = require("../assets/home-2.png");
const Home3 = require("../assets/home-3.png");

const MainScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.section, styles.reverseSection]}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            Brewed with Care, {"\n"} Sipped with Joy
          </Text>
          <Text style={styles.saleText}>
            Sale up to <Text style={styles.highlightText}>30% OFF</Text>
          </Text>
          <Text style={styles.subText}>
            Free shipping on all your orders. We deliver, you enjoy.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Teas")}
          >
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <Image source={Home1} style={styles.firstImage} />
      </View>

      <View style={styles.grid}>
        <Image source={Home2} style={styles.image} />
        <View style={styles.textContainerCenter}>
          <Text style={styles.headingCenter}>
            Steeped in tradition, {"\n"} brewed for today
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Teas")}
          >
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.centerSection, styles.bgLightGreen]}>
          <Text style={styles.centerText}>
            Crafting tranquility, one brew at a time. Experience the serenity of
            tea at TeaLife, where every sip brings a moment of calm and delight.
          </Text>
        </View>
        <Image source={Home3} style={styles.image} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDF2EE",
    // padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  reverseSection: {
    flexDirection: "column-reverse",
  },
  textContainer: {
    maxWidth: 400,
    marginBottom: 16,
  },
  textContainerCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // maxWidth: 400,
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#556B2F",
    textAlign: "center",
  },
  headingCenter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#556B2F",
    textAlign: "center",
  },
  saleText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 8,
  },
  subText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333333",
  },
  highlightText: {
    color: "#FFBF00",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#556B2F",
    padding: 12,
    borderRadius: 30,
    marginTop: 16,
    alignItems: "center",
    minWidth: 150,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  firstImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    // marginVertical: 16,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centerSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    minHeight: 150,
    textAlign: "center",
  },
  centerText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  bgLightGreen: {
    backgroundColor: "#D0E6A5",
  },
});

export default MainScreen;
