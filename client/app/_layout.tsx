import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "@/cache";
import { Image } from "expo-image";
import {
  ClerkProvider,
  ClerkLoaded,
  useAuth,
  useSession,
} from "@clerk/clerk-expo";
import { useUserStore } from "@/store/useUserStore";
import uuid from "react-native-uuid";
import { createUserInFirestore } from "@/lib/api/api";
import Toast from "react-native-toast-message";
import { useSegments } from "expo-router"; // Import `useSegments`


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}


export default function RootLayout() {
  const splash = require("../assets/careerquest logos and icons/front logo.png");

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
        <Image source={splash} style={styles.image} contentFit="contain" />
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
        <Toast/>
          <StatusBar style="auto" />
        </ClerkLoaded>
      </ClerkProvider>
  );
}

const MainContent = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser); // Access setUser from Zustand
  const { signOut, getToken } = useAuth();
  const { session, isLoaded } = useSession();

  // Ensure session is checked when the app becomes active (when close and reopen app)
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      const segments = useSegments(); // Get the current route segments
  
      // Exclude session check for specific routes
      if (segments.join("/") === "(screens)/QuestConnectScreen") {
        console.log("Skipping session check for QuestConnectScreen.");
        return;
      }
  
      if (nextAppState === "active") {
        console.log("App has become active. Checking session...");
        const token = await getToken(); // Refresh the session token
        if (token) {
          console.log("Token refreshed. Session is valid.");
          // router.replace("/(screens)/With-an-account");
        } else {
          console.log("No session found. Redirecting to sign-in.");
          router.replace("/(auth)/sign-in");
        }
      }
    };
  
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
  
    return () => subscription.remove();
  }, [getToken, router, useSegments]);
  

  // Initial session check on app load
  useEffect(() => {
    if (isLoaded) {
      if (session) {
        console.log("Session found. Redirecting to With-an-account...");

        // Fetch user data from Clerk session
        const userId = session.user?.id; // Use Clerk user ID
        const email =
          session.user?.primaryEmailAddress?.emailAddress || "Unknown Email"; // Access emailAddress
        const name = session.user?.firstName || "Unknown User";

        // Update Zustand state
        setUser(name, email, userId);

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
          .catch((err) =>
            console.error("Error creating user in Firebase:", err)
          );

        router.replace("/(screens)/With-an-account");
      } else {
        console.log("No session found. Redirecting to sign-in...");
        router.replace("/(auth)/sign-in");
      }
    }
  }, [isLoaded, session]);

  const handleLogout = async () => {
    await signOut();
    router.push("/(home)"); // Redirect to the home screen
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)/index" />
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="(screens)/With-an-account" />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
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
