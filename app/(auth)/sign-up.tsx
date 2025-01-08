import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Button
        style={styles.backButton}
        mode="text"
        icon={() => <Ionicons name="arrow-back" size={24} color="black" />}
        onPress={() => router.back()}
      >
        Back
      </Button>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Sign Up</Title>

          {/* Email Input */}
          <TextInput
            label="Enter Your Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />

          {/* Password Input */}
          <TextInput
            label="Enter Your Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />

          {/* Confirm Password Input */}
          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />

          {/* Sign-Up Button */}
          <Button
            mode="contained"
            style={styles.signUpButton}
            onPress={() => console.log("Sign Up pressed")}
          >
            Sign Up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    marginTop: 80, // To prevent overlap with back button
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 24,
    color: "#2A2A2A",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F8F7FA",
  },
  signUpButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#0000FF",
  },
});
