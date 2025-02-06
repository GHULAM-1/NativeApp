import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";
type University = {
  university: string;
  location: string;
  number: string;
  website: string;
};

type CareerOption = {
  description: string;
  universities: University[];
};

type Suggestions = {
  [key: string]: CareerOption;
};

const CareerSuggestionsScreen: React.FC = () => {
  const router = useRouter();
  const params = useGlobalSearchParams(); 

  const suggestions: Suggestions = params?.suggestions
  
  ? JSON.parse(params.suggestions as string)
  : {};
  console.log(suggestions)
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/With-an-account")}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>
          Based on your responses, here are a few career options that might be best for you:
        </Text>

        <FlatList
          data={Object.entries(suggestions)} 
          keyExtractor={([key]) => key}
          renderItem={({ item: [key, suggestion] }) => (
            <TouchableOpacity
              onPress={() => router.push(`/University-Screen`)}
              activeOpacity={0.8}
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="briefcase" size={30} color="#000" />
                  <Text style={styles.cardTitle}>{key}</Text>
                </View>
                <Text>{suggestion.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    padding: 20,
    paddingTop: 100,
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
    zIndex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2A2A2A",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#E6E6FA",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 110,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginLeft: 10,
  },
});

export default CareerSuggestionsScreen;



