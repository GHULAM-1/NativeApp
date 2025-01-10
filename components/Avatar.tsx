import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ProfileMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/(auth)/sign-in");
    } catch (error) {
      Alert.alert("Error", "Failed to sign out.");
    }
  };

  return (
    <View>
      {/* Avatar Button with Profile Image */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.avatarButton}
      >
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <Ionicons name="person-circle" size={40} color="#000" />
        )}
      </TouchableOpacity>

      {/* Modal for Profile Menu */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.username}>
              {user?.fullName || "Welcome"}
            </Text>
            <Text style={styles.email}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>

            {/* Account Settings */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                Alert.alert("Info", "Account settings coming soon!");
              }}
            >
              <Text style={styles.menuText}>Account Settings</Text>
            </TouchableOpacity>

            {/* Sign Out */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setModalVisible(false);
                handleSignOut();
              }}
            >
              <Text style={[styles.menuText, { color: "red" }]}>Sign Out</Text>
            </TouchableOpacity>

            {/* Close Modal */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarButton: {
    padding: 10,
    alignSelf: "flex-end",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  menuText: {
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
  },
  closeText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default ProfileMenu;
