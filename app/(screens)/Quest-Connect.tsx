import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { posts } from "@/lib/data'/post-data";
import { Post } from "@/lib/types/post-type";

const QuestConnectScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Back pressed")}>
          <Ionicons name="arrow-back-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quest Connect</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="notifications-outline" size={24} color="#000" style={styles.icon} />
          <Ionicons name="add-circle-outline" size={24} color="#000" style={styles.icon} />
          <Ionicons name="person-circle-outline" size={24} color="#000" />
        </View>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }: { item: Post }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#000" />
              <View style={styles.postInfo}>
                <Text style={styles.personName}>{item.personName}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.postsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
  postsContainer: {
    padding: 15,
  },
  postCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postInfo: {
    marginLeft: 10,
  },
  personName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  postContent: {
    fontSize: 14,
    color: "#2A2A2A",
  },
});

export default QuestConnectScreen;
