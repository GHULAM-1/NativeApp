// InstructionsPage.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const InstructionsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Instructions Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.header}>A/O Level Equivalence Application Guide</Text>

        <Text style={styles.paragraph}>There are three ways to apply for an equivalence certificate:</Text>
        <Text style={styles.listItem}>1. Online: Submit your application and documents through IBCC’s online portal.</Text>
        <Text style={styles.listItem}>2. Walk-in: Visit the IBCC office in person to submit your application.</Text>
        <Text style={styles.listItem}>3. Courier: Send your application and documents via courier service.</Text>

        <Text style={styles.subHeader}>Step 1: Gather Required Documents</Text>
        <Text style={styles.listItem}>• Original Passport and Attested Photocopies: These documents must be endorsed with visas of the country where you studied.</Text>
        <Text style={styles.listItem}>• Proof of Registration: This could be your admission letter or any other document that proves your enrollment in the A/O Level program.</Text>
        <Text style={styles.listItem}>• Attested Copy of NIC/Form B: The NIC (National Identity Card) is required for Pakistani citizens. If you are a minor, you will need a Form B from your parents.</Text>
        <Text style={styles.listItem}>• Original & Attested Photocopies of Certificates/Diplomas: Obtain photocopies of your original A/O Level certificates and diplomas. You will also need to get these translated into English from the National University of Modern Languages (NUML) or the concerned embassy.</Text>
        <Text style={styles.listItem}>• Syllabus Copy: Get a printed or photocopied version of the syllabus from the official records of the institution where you studied. Ensure the syllabus is in English.</Text>
        <Text style={styles.listItem}>• Previous Equivalence Certificate (if applicable): If you have already obtained an SSC equivalence certificate from IBCC, include an attested copy.</Text>

        <Text style={styles.subHeader}>Step 2: Choose an Application Method</Text>
        <Text style={styles.listItem}>1. Online: Apply through IBCC’s online portal.</Text>
        <Text style={styles.listItem}>2. Walk-in: Visit the IBCC office in person to submit your application.</Text>
        <Text style={styles.listItem}>3. Courier: Send your application and documents via courier service to the IBCC office.</Text>

        <Text style={styles.subHeader}>Step 3: Submit Your Application</Text>
        <Text style={styles.listItem}>• Online: Follow the instructions on the IBCC website to fill out the online application form and upload the required documents.</Text>
        <Text style={styles.listItem}>• Walk-in: Visit the IBCC office during working hours and submit your application and documents to the designated counter.</Text>
        <Text style={styles.listItem}>• Courier: Send your application and documents via courier to the IBCC office. Make sure to include a self-addressed stamped envelope for the return of your documents.</Text>

        <Text style={styles.subHeader}>Step 4: Pay the Application Fee</Text>
        <Text style={styles.paragraph}>The IBCC will inform you about the application fee and the payment methods available.</Text>

        <Text style={styles.subHeader}>Step 5: Track Your Application Status</Text>
        <Text style={styles.paragraph}>You can track the status of your application online through the IBCC website.</Text>

        <Text style={styles.subHeader}>Step 6: Collect Your Equivalence Certificate</Text>
        <Text style={styles.paragraph}>Once your application is processed, you will be notified about the availability of your Equivalence Certificate. You can collect it from the IBCC office or have it sent to you via courier.</Text>

        <Text style={styles.subHeader}>Additional Notes</Text>
        <Text style={styles.listItem}>• If your A/O Level certificates are plastic-coated, you will need to provide original or verified copies of your result statements from the British Council.</Text>
        <Text style={styles.listItem}>• If you are a foreign national, you will need to provide a nomination letter from the concerned embassy and an admission letter from the university or college you plan to attend in Pakistan.</Text>

        <Text style={styles.note}>Remember: It is crucial to carefully review the IBCC's official website and application guidelines for the most up-to-date information and any specific requirements.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    padding: 20,
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
  contentContainer: {
    paddingTop: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2A2A2A",
    marginBottom: 15,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2A2A2A",
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2A2A2A",
    marginBottom: 10,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2A2A2A",
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF0000",
    marginTop: 20,
    textAlign: "center",
  },
});

export default InstructionsPage;
