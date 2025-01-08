import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HomeOptions = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Form Button */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => router.push("/Form")}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="document-text-outline" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>Form</Text>
        </View>
      </TouchableOpacity>

      {/* Quest Connect Button */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => router.push("/Quest-Connect")}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="people-outline" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>Quest Connect</Text>
        </View>
      </TouchableOpacity>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => router.push("/Form")}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="chatbubbles-outline" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>AI Chatbot</Text>
        </View>
      </TouchableOpacity>

      {/* A/O Level Guide Button */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => router.push("/Equivalence-Info-Screen")}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="book-outline" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>A / O Level Student Guide</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  touchableButton: {
    width: "70%",
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#E6E6FA",
    paddingVertical: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "90%",
  },
  icon: {
    width: "30%", // Icon takes 30% of the width
    textAlign: "center", // Center align the icon
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    width: "60%", // Text takes 70% of the width
    flexWrap: "wrap", // Ensures text wraps if it exceeds the width
  },
});

export default HomeOptions;
