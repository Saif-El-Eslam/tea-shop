import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "app/utils/colors";

const { width } = Dimensions.get("window");

const ContactPage: React.FC = () => {
  const navigation = useNavigation(); // Get the navigation object
  const handleBackPress = () => {
    navigation.goBack(); // Use navigation to go back
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Contact Us</Text>
          <Text style={styles.subHeader}>
            We'd love to hear from you! Please fill out the form below.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Message</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your message"
                multiline
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                /* Handle submit */
              }}
            >
              <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: colors.lightBeige,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: colors.brown,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
  },
  formContainer: {
    maxWidth: width * 0.8,
    marginHorizontal: "auto",
    backgroundColor: colors.lightBeige,
    padding: 16,
    borderRadius: 8,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGreen,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: "center",
    marginVertical: 8,
  },
  form: {
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderColor: colors.lightGreen,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.yellow,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ContactPage;
