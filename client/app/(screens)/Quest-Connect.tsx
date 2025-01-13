import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Modal, TextInput } from "react-native-paper";
import { Image } from "expo-image";
import { useUserStore } from "@/store/useUserStore";
import * as ImagePicker from "expo-image-picker"; 
import {
  fetchPosts,
  likePost,
  addPost,
  editPost,
  deletePost,
  uploadImageToCloudinary,
} from "@/lib/api/api";
import { launchImageLibrary } from "react-native-image-picker";
import { notifications } from "@/lib/data'/notification";
const QuestConnectScreen: React.FC = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const { name, email, id: userId } = useUserStore();
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

  const handleOptionButtonClick = (postId: string) => {
    setSelectedPostId((prevPostId) => (prevPostId === postId ? null : postId));
  };

  const handleImagePick = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    
 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewImageUri(result.assets[0].uri); 
    }
  };

  const closeOptions = () => {
    setSelectedPostId(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  const formatDate = (dateString: string): string => {
    if (!dateString) return "Invalid Date";
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
  
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };
  

  const handleAddPost = async () => {
    if (!newPost.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    if (!email) {
      alert(
        "You cannot add a post without an email address. Please log in or provide an email."
      );
      return;
    }

    let imageUrl = null;
    if (newImageUri) {
      try {
        imageUrl = await uploadImageToCloudinary(newImageUri);
        console.log("uploded",imageUrl)
      } catch (error) {
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    const postId = `${userId}-${Date.now()}`;
    const postDate = new Date().toISOString();

    const newPostData = {
      id: postId,
      username: name || "Anonymous",
      date: postDate,
      text: newPost,
      likes: 0,
      likedBy: [],
      author: email,
      imageUrl: imageUrl || "",
    };

    setPosts((prevPosts) => [
      {
        ...newPostData,
        date: formatDate(postDate),
      },
      ...prevPosts,
    ]);

    setNewPost("");
    setIsDialogVisible(false);
    try {
      await addPost(newPostData);
    } catch (error) {
      alert("Failed to add post. Please try again.");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      if (userId) {
        const updatedPost = await likePost(postId, userId);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, ...updatedPost } : post
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleEditPost = async () => {
    if (!editPostId || !email) {
      alert("Error: Unable to edit this post.");
      return;
    }

    let imageUrl = null;
    if (newImageUri) {
      try {
        imageUrl = await uploadImageToCloudinary(newImageUri);
      } catch (error) {
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    try {
      if(imageUrl){
        await editPost(editPostId, email, newPost, imageUrl);
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editPostId
            ? { ...post, text: newPost, imageUrl: imageUrl || post.imageUrl }
            : post
        )
      );
      setNewPost("");
      setEditPostId(null);
      setIsDialogVisible(false);
    } catch (error) {
      console.error("Error editing post:", error);
      alert("Failed to edit the post. Please try again.");
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!email) {
      alert("Error: Unable to delete this post.");
      return;
    }

    try {
      await deletePost(postId, email);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate("/(screens)/With-an-account")}>
          <Image source={logo}  style={styles.image} contentFit="cover" />
          </TouchableOpacity>
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

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Ionicons name="person-circle-outline" size={24} color="#000" />
              <View style={styles.postInfo}>
                <Text style={styles.personName}>{item.username}</Text>
                <Text style={styles.date}>{formatDate(item.date)}</Text>
              </View>

              {item.author === email && (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleOptionButtonClick(item.id)}
                >
                  <Ionicons name="ellipsis-horizontal" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>

            {selectedPostId === item.id && (
              <View style={styles.optionsMenu}>
                <Button
                  mode="text"
                  onPress={() => {
                    setEditPostId(item.id);
                    setNewPost(item.text);
                    setNewImageUri(item.imageUrl || null);
                    setIsDialogVisible(true);
                    closeOptions();
                  }}
                >
                  Edit
                </Button>
                <Button
                  mode="text"
                  onPress={() => {
                    handleDeletePost(item.id);
                    closeOptions();
                  }}
                  textColor="red"
                >
                  Delete
                </Button>
              </View>
            )}

            <View style={styles.postContentContainer}>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.postImage}
                />
              )}
              <Text style={styles.postContent}>{item.text}</Text>
            </View>

            <View style={styles.postFooter}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons
                  name={
                    item.likedBy?.includes(userId) ? "heart" : "heart-outline"
                  }
                  size={24}
                  color={item.likedBy?.includes(userId) ? "red" : "gray"}
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
              <Text style={styles.likes}>{item.likes}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.postsContainer}
      />

      <Modal
        visible={isDialogVisible || !!editPostId}
        onDismiss={() => {
          setIsDialogVisible(false);
          setEditPostId(null);
          setNewPost("");
        }}
        contentContainerStyle={styles.dialog}
      >
        <Text style={styles.dialogTitle}>
          {editPostId ? "Edit Post" : "Add New Post"}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your post here..."
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        {newImageUri && (
          <Image source={{ uri: newImageUri }} style={styles.imagePreview} />
        )}
        <Button onPress={handleImagePick}>Upload Image</Button>
        <View style={styles.dialogActions}>
          <Button
            mode="outlined"
            onPress={() => {
              setIsDialogVisible(false);
              setEditPostId(null);
              setNewPost("");
            }}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={editPostId ? handleEditPost : handleAddPost}
          >
            {editPostId ? "Save Changes" : "Add"}
          </Button>
        </View>
      </Modal>
      {showNotifications && (
        <View style={styles.notificationDropdown}>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationDate}>
                  {formatDate(item.date)}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  likes: {
    fontSize: 14,
    color: "#007AFF",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  postContent: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  postCard: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  postInfo: {
    marginLeft: 10,
  },
  personName: {
    fontWeight: "bold",
  },
  date: {
    color: "#777",
    fontSize: 12,
  },
  optionButton: {
    marginLeft: "auto",
  },
  optionsMenu: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  postContentContainer: {
    marginTop: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  dialog: {
    padding: 20,
    backgroundColor:"white",
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    // height: 100,
    textAlignVertical: "top",
  },
  dialogActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  heartIcon: {
    marginRight: 5,
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
 
  scrollableText: {
    flexGrow: 0,
  },

});
export default QuestConnectScreen;

