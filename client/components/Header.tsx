import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ProfileMenu from "./ProfileMenu";
import { Link } from "expo-router";

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
     <Link href="/(screens)/With-an-account">
      <Image
        source={require("../assets/careerquest logos and icons/front logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      </Link>

      {/* Profile Menu */}
      <ProfileMenu />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15, // Add padding for spacing
      backgroundColor: "#f8f7fa",
      height: 80, // Set a consistent header height
    },
    logo: {
      width: 150, // Base width
      height: 50, // Base height
      transform: [{ scale: 4.5 }], // Zoom the logo
    },
  });
  

export default Header;