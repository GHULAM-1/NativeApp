import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { tokenCache } from "@/cache";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";

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
        <StatusBar style="auto" />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const MainContent = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/(home)"); // Redirect to the home screen
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <Stack screenOptions={{
        headerShown: false, // Hides the header globally
      }}>
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
