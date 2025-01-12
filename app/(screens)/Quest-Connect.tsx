import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { posts } from "@/lib/data'/post-data";
import { Post } from "@/lib/types/post-type";
import { router } from "expo-router";
import { Modal, Button } from "react-native-paper";
import Header from "@/components/Header";

const QuestConnectScreen: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    console.log("New Post:", newPost);
    setNewPost("");
    setIsDialogVisible(false);
  };

  return (
    <>
    <View style={styles.topHeader}>
      <Header title="Home" />
    </View>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quest Connect</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
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

      {/* Add Post Dialog */}
      <Modal
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
        contentContainerStyle={styles.dialog}
      >
        <Text style={styles.dialogTitle}>Add New Post</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your post here..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <View style={styles.dialogActions}>
          <Button
            mode="outlined"
            onPress={() => setIsDialogVisible(false)}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button mode="contained" onPress={handleAddPost}>
            Add
          </Button>
        </View>
      </Modal>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  topHeader: {
    marginTop:26,
    padding:0,
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
    marginLeft: 10,
  },
  backButton: {
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1,
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
  dialog: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: "top",
    fontSize: 14,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    marginRight: 10,
  },
});

export default QuestConnectScreen;
