import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { posts } from "@/lib/data'/post-data";
import { Post } from "@/lib/types/post-type";
import { notifications } from "@/lib/data'/notification";
import { Notification } from "@/lib/types/notification";
import { router } from "expo-router";
import { Button, Modal, TextInput } from "react-native-paper";
import { Image } from "expo-image";

const QuestConnectScreen: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true); // Track splash screen visibility

  useEffect(() => {
    // Simulate splash screen for 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false); // Hide splash screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleAddPost = () => {
    console.log("New Post:", newPost);
    setNewPost("");
    setIsDialogVisible(false);
  };

  const logo = require("../../assets/careerquest logos and icons/front logo.png");
  const splash = require("../../assets/careerquest logos and icons/quest connect.png");
  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Image source={splash} style={styles.splashLogo} contentFit="cover" />
        <Text style={styles.splashText}>Quest Connect</Text>

      </View>
    );
  }

  return (
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
          <Image source={logo} style={styles.image} contentFit="cover" />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => setShowNotifications(!showNotifications)}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Ionicons name="person" size={24} color="#000" />
        </View>
      </View>

      {/* Notification Dropdown */}
      {showNotifications && (
        <View style={styles.notificationDropdown}>
          <FlatList
            data={notifications}
            keyExtractor={(item: Notification) => item.id}
            renderItem={({ item }: { item: Notification }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationDate}>{item.date}</Text>
              </View>
            )}
          />
        </View>
      )}

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F7FA",
  },
  splashLogo: {
    width: 400,
    height: 400,
    
  },
  splashText: {
    fontSize: 18,
    color: "#000",
    position: "absolute",
    top: 530,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cancelButton: {
    marginRight: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
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
  icon: {
    marginHorizontal: 5,
  },
  notificationDropdown: {
    position: "absolute",
    top: 50, // Adjust this value based on icon size
    right: 80,
    backgroundColor: "#FFF",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10, // Rounded border
    maxWidth: 290,
    width: "100%",
    maxHeight: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 10,
  },
  notificationItem: {
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
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
    borderRadius: 10,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default QuestConnectScreen;
