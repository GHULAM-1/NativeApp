import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const UniversitySearchScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.parent}>
        {/* Title */}
        <Text style={styles.title}>Universities names list here :</Text>

        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => console.log("Search for universities nearby")}
        >
          <Text style={styles.searchButtonText}>
            Click here to search universities near by me.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  parent:{
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"space-between",
    height:"75%"
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2A2A2A",
    marginBottom: 50,
  },
  searchButton: {
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});

export default UniversitySearchScreen;
