import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ProfileMenu from "./Avatar";
import { Link } from "expo-router";

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
     <Link href="/(screens)/With-an-account">
      <Image
        source={require("../assets/images/quest-connect.png")}
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
  
  
   

    
   
  },
  logo: {
    width: 100, // Adjust width according to your logo's size
    height: 100,
    alignItems:"baseline" // Adjust height according to your logo's size
  },
});

export default Header;
