import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

const AccountSettings = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeName = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert("Validation Error", "First and Last names cannot be empty.");
      return;
    }

    try {
      const apiKey = process.env.EXPO_PUBLIC_CLERK_SECRET_API_KEY;

      const response = await fetch(`https://api.clerk.dev/v1/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || "Failed to update name.");
      }

      Alert.alert("Success", "Your name has been updated.");
    } catch (error) {
      console.error("Error updating name:", error);
      Alert.alert("Error", "Failed to update your name.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      Alert.alert("Validation Error", "Passwords cannot be empty.");
      return;
    }
  
    try {
      const key = process.env.EXPO_PUBLIC_CLERK_SECRET_API_KEY;
  
      const response = await fetch(`https://api.clerk.dev/v1/me/passkeys/{passkey_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.message || "Failed to update password.");
        } else {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to update password.");
        }
      }
  
      Alert.alert("Success", "Your password has been updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
  
      if (error instanceof Error) {
        Alert.alert("Error", error.message || "Failed to update your password.");
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    }
  };
  

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Account Settings</Text>

          {/* Change Name Section */}
          <Text style={styles.sectionTitle}>Change Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TouchableOpacity style={styles.button} onPress={handleChangeName}>
            <Text style={styles.buttonText}>Update Name</Text>
          </TouchableOpacity>

          {/* Change Password Section
          <Text style={styles.sectionTitle}>Change Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity> */}

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AccountSettings;