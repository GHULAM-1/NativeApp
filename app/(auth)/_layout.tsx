import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {

    return <Redirect href="/(screens)/With-an-account" />;
  }

  return <Stack screenOptions={{
    headerShown: false, // Hides the header globally
  }} />;
}
