import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const placeholderImage = "https://placehold.co/500";
const teamMemberImage = "https://placehold.co/150";

const AboutScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const imageHeight = width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>
            At TeaLife, we are dedicated to delivering the finest selection of
            teas from around the globe, crafted with care and brewed to
            perfection. Discover serenity in every sip.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.textContainerMobile}>
              <Text style={styles.sectionTitle}>Our Story</Text>
              <Text style={styles.sectionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                elementum, velit ut elementum convallis, nisl ex aliquet odio,
                ut posuere neque magna in eros. Curabitur sit amet mi ac erat
                efficitur scelerisque ac nec augue.
              </Text>
              <Text style={styles.sectionText}>
                Phasellus sit amet felis eget ligula interdum interdum nec vitae
                orci. Vestibulum tempus est eu ipsum feugiat pharetra. Nunc
                vitae nisi non nunc auctor porttitor. Proin aliquam fermentum
                libero, vitae tempor lorem.
              </Text>
            </View>
            <Image
              source={{ uri: placeholderImage }}
              style={[styles.imageMobile, { height: imageHeight }]}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.textContainerMobile}>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <Text style={styles.sectionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                elementum, velit ut elementum convallis, nisl ex aliquet odio,
                ut posuere neque magna in eros. Curabitur sit amet mi ac erat
                efficitur scelerisque ac nec augue.
              </Text>
              <Text style={styles.sectionText}>
                Phasellus sit amet felis eget ligula interdum interdum nec vitae
                orci. Vestibulum tempus est eu ipsum feugiat pharetra. Nunc
                vitae nisi non nunc auctor porttitor. Proin aliquam fermentum
                libero, vitae tempor lorem.
              </Text>
            </View>
            <Image
              source={{ uri: placeholderImage }}
              style={[styles.imageMobile, { height: imageHeight }]}
            />
          </View>

          <View style={styles.teamSection}>
            <Text style={styles.teamTitle}>Meet the Team</Text>
            <View style={styles.teamGrid}>
              <View
                style={[
                  styles.teamMember,
                  width < 600 && styles.teamMemberMobile,
                ]}
              >
                <Image
                  source={{ uri: teamMemberImage }}
                  style={[styles.teamImage]}
                />
                <Text style={styles.teamName}>John Doe</Text>
                <Text style={styles.teamRole}>CEO & Founder</Text>
              </View>
              <View
                style={[
                  styles.teamMember,
                  width < 600 && styles.teamMemberMobile,
                ]}
              >
                <Image
                  source={{ uri: teamMemberImage }}
                  style={[styles.teamImage]}
                />
                <Text style={styles.teamName}>Jane Smith</Text>
                <Text style={styles.teamRole}>Head of Marketing</Text>
              </View>
              <View
                style={[
                  styles.teamMember,
                  width < 600 && styles.teamMemberMobile,
                ]}
              >
                <Image
                  source={{ uri: teamMemberImage }}
                  style={[styles.teamImage]}
                />
                <Text style={styles.teamName}>Emily Johnson</Text>
                <Text style={styles.teamRole}>Product Manager</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4E3",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#8B4513",
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
  scrollContent: {
    padding: 20,
  },
  headerTextContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: "#8B4513",
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
  },
  textContainerMobile: {
    paddingRight: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#556B2F",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 10,
  },
  imageMobile: {
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  teamSection: {
    alignItems: "center",
  },
  teamTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#556B2F",
    marginBottom: 20,
  },
  teamGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  teamMember: {
    alignItems: "center",
    marginBottom: 20,
    width: "30%",
  },
  teamMemberMobile: {
    width: "100%",
  },
  teamImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#556B2F",
  },
  teamRole: {
    fontSize: 16,
    color: "#555",
  },
});

export default AboutScreen;
