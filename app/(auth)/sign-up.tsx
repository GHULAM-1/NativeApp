import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Title } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useSignUp,useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

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
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility


  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleGoogle = React.useCallback(async () => {
    if (!setActive) {
      console.error('setActive is undefined');
      return;
    }

    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(screens)/With-an-account', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('/(screens)/With-an-account');
      } else {
        console.error('OAuth sign-in not complete');
      }
    } catch (err) {
      console.error('OAuth Sign-In Error:', err);
    }
  }, [startOAuthFlow, setActive, router]);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-Up Error:", JSON.stringify(err, null, 2));
      Alert.alert("Sign-Up Failed", "Please try again later.");
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
        router.replace('/(screens)/With-an-account');
      } else {
        Alert.alert("Verification Failed", "Please try again.");
      }
    } catch (err) {
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
                icon={showPassword ? "eye-off-outline" : "eye-outline"} // Use valid icons
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
                icon={showConfirmPassword ? "eye-off-outline" : "eye-outline"} // Use valid icons
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
    top: 40,
    left: 20,
    zIndex: 1,
  },
  googleButton: {
    marginBottom: 20,
    borderRadius: 10,
    marginTop:10,
    borderColor: '#0000FF',
    width: "100%", // Ensures button takes full width
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
});
