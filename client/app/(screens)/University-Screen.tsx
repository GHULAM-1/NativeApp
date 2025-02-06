import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Import the local JSON file
import careerData from "@/lib/data'/string-to-json-online.json"

type University = {
  university: string;
  location: string;
  number: string;
  website: string;
};

const UniversitySearchScreen: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const extractUniversities = () => {
      const allUniversities: University[] = [];

      // Extract universities from the JSON file
      Object.values(careerData.professions).forEach((profession: any) => {
        Object.values(profession).forEach((career: any) => {
          if (career.universities) {
            allUniversities.push(...career.universities);
          }
        });
      });

      setUniversities(allUniversities);
    };

    extractUniversities();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.parent}>
        {/* Title */}
        <Text style={styles.title}>Universities names list here:</Text>

        {/* List of Universities */}
        <FlatList
          data={universities}
          keyExtractor={(item, index) => `${item.university}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.universityName}>{item.university}</Text>
              <Text style={styles.details}>Location: {item.location}</Text>
              <Text style={styles.details}>Contact: {item.number}</Text>
              <Text style={styles.details}>Website: {item.website}</Text>
            </View>
          )}
        />

        {/* Search Button */}
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => router.push("/(screens)/Universities-Location")}
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
  parent: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 80,
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
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: 10,
  },
  universityName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#2A2A2A",
    marginBottom: 3,
  },
  searchButton: {
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "black",
    marginTop: 30,
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
