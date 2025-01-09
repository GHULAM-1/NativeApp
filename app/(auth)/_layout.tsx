import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSession } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const { session, isLoaded: isSessionLoaded } = useSession();
  const { isLoaded: isAuthLoaded } = useAuth();

  useEffect(() => {
    if (isSessionLoaded && isAuthLoaded) {
      if (session) {
        router.replace("/(screens)/With-an-account");
      } else {
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isSessionLoaded, isAuthLoaded, session]);

  // Show a loading spinner while Clerk is initializing
  if (!isSessionLoaded || !isAuthLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Redirect signed-in users to their main account screen
  if (isSignedIn) {
    return <Redirect href="/(screens)/With-an-account" />;
  }

  // If not signed in, show the auth stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
