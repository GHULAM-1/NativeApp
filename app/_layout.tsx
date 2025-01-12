import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, AppState,AppStateStatus  } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "@/cache";
import { ClerkProvider, ClerkLoaded, useAuth, useSession } from "@clerk/clerk-expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>CareerQuest</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <MainContent />
        <StatusBar style="auto" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const MainContent = () => {
  const router = useRouter();
  const { signOut, getToken } = useAuth();
  const { session, isLoaded } = useSession();

  // Ensure session is checked when the app becomes active
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        console.log("App has become active. Checking session...");
        try {
          const token = await getToken(); // Refresh the session token
          if (token) {
            console.log("Token found. Session is valid.");
            router.replace("/(screens)/With-an-account");
          } else {
            console.log("No token found. Redirecting to HomeScreen...");
            router.replace("/(screens)/HomeScreen");
          }
        } catch (error) {
          console.error("Error checking token:", error);
          router.replace("/(screens)/HomeScreen");
        }
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => subscription.remove();
  }, [getToken, router]);

  // Initial session check on app load
  useEffect(() => {
    if (isLoaded) {
      if (session) {
        console.log("Session found. Redirecting to With-an-account...");
        router.replace("/(screens)/With-an-account");
      } else {
        console.log("No session found. Redirecting to HomeScreen...");
        router.replace("/(screens)/HomeScreen");
      }
    }
  }, [isLoaded, session]);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false, // Hides the header globally
        }}
      >
        <Stack.Screen name="(home)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen
          name="(screens)/HomeScreen"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
};


const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "skyblue",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 40,
    marginRight: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
