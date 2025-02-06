import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const EquivalenceInfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Information Text */}
      <Text style={styles.infoText}>
        To recognize O-level qualifications in Pakistan, you need an equivalence
        certificate from the IBCC. Apply at a regional IBCC office with your
        O-level certificate and transcripts.
      </Text>

      {/* Instructions Button */}
      <TouchableOpacity
        style={styles.instructionButton}
        onPress={() => router.push("/(screens)/Information")}
      >
        {" "}
        <LinearGradient
          colors={["#FFFFFF", "#D9ECFC"]}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>For Instructions click here :</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Download Form Button */}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() =>
          Linking.openURL("https://equivalence.ibcc.edu.pk/?action=login")
        }
      >
        <LinearGradient
          colors={["#FFFFFF", "#D9ECFC"]}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>
            To download equivalence form click here :
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Feedback Button */}
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={() => console.log("Feedback Clicked")}
      >
        <Text style={styles.feedbackText}>
          Is this helpful? give us feedback
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 1.2,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2A2A2A",
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 24,
  },
  instructionButton: {
    borderRadius: 10,
    borderColor: "black",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  downloadButton: {
    borderColor: "black",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  feedbackButton: {
    backgroundColor: "#2018A5",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2A2A2A",
    textAlign: "center",
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default EquivalenceInfoScreen;
