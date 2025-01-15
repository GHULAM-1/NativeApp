import React, { useState, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useSignUp, useOAuth, useUser, useSession } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { createUserInFirestore } from "@/lib/api/api";
import uuid from "react-native-uuid";
import { useUserStore } from "@/store/useUserStore";
import Toast from "react-native-toast-message";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  useWarmUpBrowser();
  const { user } = useUser();
  const { name, email, id } = useUserStore();
  const { session } = useSession();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [namee, setNamee] = useState(""); // New state for the Name field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const setUser = useUserStore((state) => state.setUser); // Access setUser from Zustand
const showToast = (type:any, message:any) => {
    Toast.show({
      type,
      text1: message,
      position: "bottom",
    });
  };
  const extractNameFromEmail = (email: string): string => {
    if (!email || !email.includes("@")) {
      return "Unknown User"; // Fallback if the email is invalid
    }

    // Extract the part before the '@' symbol
    const localPart = email.split("@")[0];

    // Replace dots, underscores, and hyphens with spaces
    const name = localPart
      .replace(/[._-]/g, " ")
      .replace(/\s+/g, " ") // Remove extra spaces
      .trim();

    // Capitalize the first letter of each word
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleGoogle = useCallback(async () => {
    if (!setActive) {
      console.error("setActive is undefined");
      return;
    }

    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(screens)/With-an-account", {
          scheme: "myapp",
        }),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });

        // Fetch user data from Clerk
        const userId = uuid.v4();
        const user = session?.user || {};
        console.log(user, "from signup");
        const name = user || "Unknown User";
        const email = user || "Unknown Email";

        // Send to Firebase
        const userData = { id: userId, name, email_address: email };
        createUserInFirestore(userData)
          .then((response) => {
            if (response.alreadyExists) {
              console.log("User already exists in Firebase.");
            } else {
              console.log("User created successfully in Firebase.");
            }
          })
          .catch((err) => console.log());

        router.replace("/(screens)/With-an-account");
      } else {
        showToast("error", "Google Sign in not completed.");
      }
    } catch (err) {
      showToast("error", "OAuth Sign-In Error");
    }
  }, [startOAuthFlow, setActive, session, setUser, router]);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
  
    try {
      // Pass the name field along with email and password to Clerk
      const signUpAttempt = await signUp.create({
        emailAddress,
        password,
        firstName: namee, // Adding Name Field
      });
  
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  
      setPendingVerification(true);
  
      // Get Clerk user data
      const userId = signUpAttempt.id; // Use Clerk user ID
      const name = namee;
      const email = emailAddress;
  
      // Send to Firebase
      const userData = { id: userId, name, email_address: email };
      await createUserInFirestore(userData)
        .then((response) => {
          if (response.alreadyExists) {
            console.log("User already exists in Firebase.");
          } else {
            console.log("User created successfully in Firebase.");
          }
        })
        .catch((err) => console.log());
    } catch (err) {
      Alert.alert("Sign-Up Failed", "This Email is already taken. Please try again later.");
    }
  };
  
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        const userId = uuid.v4();

        // Prepare user data and call Firestore API
        const userData = {
          id: id,
          name: namee,
          email_address: emailAddress,
        };
        console.log("User data for Firestore:", userData);
        await createUserInFirestore(userData);

        router.replace("/(screens)/With-an-account");
      } else {
        Alert.alert("Verification Failed", "Please try again.");
      }
    } catch (err) {
      console.error("Verification Error:", err);
      Alert.alert("Verification Failed", "Invalid code. Please try again.");
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Verify Your Email</Title>

            <TextInput
              label="Verification Code"
              mode="outlined"
              value={code}
              onChangeText={setCode}
              style={styles.input}
              outlineColor="#D9D9D9"
              activeOutlineColor="#0000FF"
            />

            <Button
              mode="contained"
              style={styles.signUpButton}
              onPress={onVerifyPress}
            >
              Verify
            </Button>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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

          <TextInput
            label="Enter Your Name"
            mode="outlined"
            value={namee}
            onChangeText={setNamee}
            style={styles.input}
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />
          <TextInput
            label="Enter Your Email"
            mode="outlined"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.input}
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />
          <TextInput
            label="Enter Your Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off-outline" : "eye-outline"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <Button
            mode="contained"
            style={styles.signUpButton}
            onPress={onSignUpPress}
          >
            Sign Up
          </Button>
          <Button
            mode="outlined"
            style={styles.googleButton}
            icon="google"
            onPress={handleGoogle}
          >
            Sign in with Google
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
    top: 50,
    left: 20,
    zIndex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    marginTop: 80,
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
  googleButton: {
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#0000FF",
    width: "100%",
  },
});
