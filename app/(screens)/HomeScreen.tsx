import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {/* Use With An Account */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text style={styles.text}>Use With An Account</Text>
          <Ionicons
            name="person"
            size={24}
            color="#000"
            style={styles.icon1}
          />
        </TouchableOpacity>

        {/* Use Without An Account */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(screens)/Without-an-account")}
        >
          <Text style={styles.text}>Use Without An Account</Text>
          <Ionicons
            name="person-remove"
            size={24}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center", // Ensure vertical alignment
    justifyContent: "space-around", // Space between text and icon
    backgroundColor: "#E8E8E8",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginLeft: 0, // Adds space between the icon and text
  },
  icon1: {
    marginLeft: 23, // Adds space between the icon and text
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

export default HomeScreen;
