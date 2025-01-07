import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { tokenCache } from "@/cache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useColorScheme } from "@/hooks/useColorScheme";



const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  
  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>CarrerQuest</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
      
          <Stack.Screen
            name="index" 
            options={{ headerShown: false }}
          />
    
          <Stack.Screen
            name="HomeScreen"
            options={{ title: "Home" }}
          />
          {/* Other screens */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ClerkLoaded>
    </ClerkProvider>
  );
  
}

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
});
