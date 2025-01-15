import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

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
        onPress={() => console.log("For Instructions Clicked")}
      >
        <Text style={styles.buttonText}>For Instructions click here :</Text>
      </TouchableOpacity>

      {/* Download Form Button */}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => console.log("Download Form Clicked")}
      >
        <Text style={styles.buttonText}>
          To download equivalence form click here :
        </Text>
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
    container: {
      flex: 1,
      backgroundColor: "#F8F7FA",
      justifyContent: "center", // Centers content vertically
      alignItems: "center", // Centers content horizontally
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
      backgroundColor: "#E6E6FA",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderColor: "black",
      borderWidth: 1,
      width: "100%",
      marginVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    downloadButton: {
      backgroundColor: "#D6EAF8",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderColor: "black",
      borderWidth: 1,
      width: "100%",
      marginVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    feedbackButton: {
      backgroundColor: "#0000FF",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
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
