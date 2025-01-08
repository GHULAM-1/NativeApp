import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        {/* Use With An Account */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text style={styles.text}>Use With An Account</Text>
        </TouchableOpacity>

        {/* Use Without An Account */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(screens)/Without-an-account")}
        >
          <Text style={styles.text}>Use Without An Account</Text>
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
    width: "100%", // Ensures container takes full width
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#E8E8E8",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    padding: 20,
    width: "80%", // Adjusts button width
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});

export default HomeScreen;
