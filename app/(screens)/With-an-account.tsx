import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HomeOptions = () => {
  return (
    <View style={styles.container}>
      {/* Form Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/Form")} // Replace "/Form" with your target route
      >
        <Button
          mode="outlined"
          style={styles.button}
          icon={() => (
            <Ionicons name="document-text-outline" size={24} color="#000" />
          )}
        >
          Form
        </Button>
      </TouchableOpacity>

      {/* Quest Connect Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/Quest-Connect")} // Replace with your target route
      >
        <Button
          mode="outlined"
          style={styles.button}
          icon={() => <Ionicons name="people-outline" size={24} color="#000" />}
        >
          Quest Connect
        </Button>
      </TouchableOpacity>

      {/* AI Chatbot Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/Form")} // Replace with your target route
      >
        <Button
          mode="outlined"
          style={styles.button}
          icon={() => (
            <Ionicons name="chatbubbles-outline" size={24} color="#000" />
          )}
        >
          AI Chatbot
        </Button>
      </TouchableOpacity>

      {/* A/O Level Guide Button */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/Form")} // Replace with your target route
      >
        <Button
          mode="outlined"
          style={styles.button}
          icon={() => <Ionicons name="book-outline" size={24} color="#000" />}
        >
          A / O level student Guide
        </Button>
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
  buttonWrapper: {
    width: "70%", // Ensure the entire button takes up 70% of the width
    marginVertical: 10, // Spacing between buttons
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    backgroundColor: "#E6E6FA", // Light background for button
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default HomeOptions;
