import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { careerOptions } from "@/lib/data'/form-result-data";
import { CareerOption } from "@/lib/types/form-result-type";
import { router } from "expo-router";

const CareerSuggestionsScreen: React.FC = () => {
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
        {/* Header */}
        <Text style={styles.header}>
          Based on your responses, here are a few career options that might be
          best for you:
        </Text>

        {/* Career Options List */}
        <FlatList
          data={careerOptions}
          keyExtractor={(item: CareerOption) => item.id}
          renderItem={({ item }: { item: CareerOption }) => (
            <TouchableOpacity
              onPress={() => router.push(`/University-Screen`)}
              activeOpacity={0.8} // Navigate to a detailed screen
            >
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name={item.icon} size={30} color="#000" />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.cardNote}>
                  <Text style={styles.boldText}>Note: </Text>
                  {item.note}
                </Text>
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
    top: 40,
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
  cardNote: {
    fontSize: 14,
    color: "#2A2A2A",
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default CareerSuggestionsScreen;
