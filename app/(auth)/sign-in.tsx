import React ,{useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { useSignIn, useOAuth } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Warm-up the browser for better user experience during OAuth flow
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogle = React.useCallback(async () => {
    if (!setActive) {
      console.error("setActive is undefined");
      return;
    }

    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(screens)/With-an-account", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/(screens)/With-an-account");
      } else {
        console.error("OAuth sign-in not complete");
      }
    } catch (err) {
      console.error("OAuth Sign-In Error:", err);
    }
  }, [startOAuthFlow, setActive, router]);

  const handleEmailSignIn = React.useCallback(async () => {
    if (!isLoaded || !setActive) {
      console.error("Sign-in is not loaded or setActive is undefined");
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(screens)/With-an-account");
      } else {
        console.error("Sign-in not complete:", signInAttempt);
      }
    } catch (err) {
      console.error("Email Sign-In Error:", err);
    }
  }, [isLoaded, emailAddress, password, signIn, setActive, router]);

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <TouchableOpacity style={styles.customBackButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Sign In</Title>

          {/* Email Input */}
          <TextInput
            label="Enter User Name or Email"
            mode="outlined"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.input}
            autoCapitalize="none"
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
          />

          {/* Password Input */}
          <TextInput
            label="Enter Password"
            mode="outlined"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            outlineColor="#D9D9D9"
            activeOutlineColor="#0000FF"
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off-outline" : "eye-outline"} // Use valid icons
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          {/* Forgot Password */}
          <Button
            mode="text"
            onPress={() => console.log("Navigate to reset password")}
            style={styles.link}
          >
            Forgot Password?
          </Button>

          {/* Sign-In Button */}
          <Button mode="contained" style={styles.signInButton} onPress={handleEmailSignIn}>
            Sign In
          </Button>

          {/* Google Sign-In */}
          <Button
            mode="outlined"
            style={styles.googleButton}
            icon="google"
            onPress={handleGoogle}
          >
            Sign in with Google
          </Button>

          {/* Footer */}
          <View style={styles.footer}>
            <Link href="/sign-up" asChild>
              <Button compact mode="text">
                Don’t have an account? Sign up
              </Button>
            </Link>
          </View>
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
    alignItems: "center",
    width: "100%",
  },
  customBackButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: "#000000", // Black background
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    alignSelf: "stretch",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#2A2A2A",
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F8F7FA",
    width: "100%",
  },
  signInButton: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#0000FF",
    width: "100%",
  },
  googleButton: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#0000FF",
    width: "100%",
  },
  footer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginBottom: 20,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});

