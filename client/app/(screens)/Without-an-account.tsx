import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const FormPromptScreen: React.FC = () => {
  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => router.push("/HomeScreen")}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
      {/* Message */}
      <Text style={styles.message}>
        Kindly Click <Text style={styles.highlight}>"Form"</Text> and get the
        guided career suggestion.
      </Text>

      {/* Form Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Form")}>
        <Ionicons name="document-text-outline" size={24} color="#000" style={styles.icon} />
        <Text style={styles.buttonText}>Form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F7FA",
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
  message: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2A2A2A",
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    backgroundColor: "#E6E6FA",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

export default FormPromptScreen;
