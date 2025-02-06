import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "@/store/useUserStore";
import Header from "@/components/Header";

const HomeOptions = () => {
  const form = require("../../assets/careerquest logos and icons/icons/form.png");
  const connect = require("../../assets/careerquest logos and icons/icons/connect.png");
  const chatbot = require("../../assets/careerquest logos and icons/icons/AI Chatbot.png");
  const aolevel = require("../../assets/careerquest logos and icons/icons/article.png");
  const { name, email, id } = useUserStore();

  console.log(name, email, id);

  return (
    <>
      <View style={styles.header}>
        <Header title="Home" />
      </View>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/HomeScreen")}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Form Button */}
        <TouchableOpacity onPress={() => router.push("/Form")} style={styles.buttonContainer}>
          <LinearGradient colors={["#FFFFFF", "#CFCCFD"]} style={styles.gradientButton}>
            <View style={styles.buttonContent}>
              <Image source={form} style={styles.image} contentFit="contain" />
              <Text style={styles.text}>Form</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quest Connect Button */}
        <TouchableOpacity onPress={() => router.push("/Quest-Connect")} style={styles.buttonContainer}>
          <LinearGradient colors={["#FFFFFF", "#CFCCFD"]} style={styles.gradientButton}>
            <View style={styles.buttonContent}>
              <Image source={connect} style={styles.image} contentFit="contain" />
              <Text style={styles.text}>Quest Connect</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* AI Chatbot Button */}
        <TouchableOpacity onPress={() => router.push("/ChatBot")} style={styles.buttonContainer}>
          <LinearGradient colors={["#FFFFFF", "#CFCCFD"]} style={styles.gradientButton}>
            <View style={styles.buttonContent}>
              <Image source={chatbot} style={styles.image} contentFit="contain" />
              <Text style={styles.text}>AI Chatbot</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* A/O Level Guide Button */}
        <TouchableOpacity onPress={() => router.push("/Equivalence-Info-Screen")} style={styles.buttonContainer}>
          <LinearGradient colors={["#FFFFFF", "#CFCCFD"]} style={styles.gradientButton}>
            <View style={styles.buttonContent}>
              <Image source={aolevel} style={styles.image2} contentFit="contain" />
              <Text style={styles.text}>A / O Level Student Guide</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginTop: 26,
    padding: 0,
  },
  image: {
    width: 70,
    height: 30,
  },
  image2: {
    width: 70,
    height: 60,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonContainer: {
    width: "70%",
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,

  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    width: "60%",
    flexWrap: "wrap",
  },
});

export default HomeOptions;
