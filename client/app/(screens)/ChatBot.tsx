import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { streamChatResponse } from "@/lib/api/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Message = {
  sender: string;
  text: string;
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
  
    const userMessage: Message = { sender: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
  
    const botMessage: Message = { sender: "AI", text: "" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsStreaming(true);
  
    const cleanup = streamChatResponse(
      input,
      (chunk) => {
        if (chunk === "[DONE]") {
          setIsStreaming(false);
          cleanup();
          return;
        }
  
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage.sender === "AI") {
            lastMessage.text = lastMessage.text.trimEnd() + " " + chunk.trimStart();
          }
          return updatedMessages;
        });
      },
      (error) => {
        console.error("Streaming error:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "AI", text: "Error connecting to the chatbot." },
        ]);
        setIsStreaming(false);
      }
    );
  };
  
  
  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.container}>
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={
                msg.sender === "AI"
                  ? styles.botMessageContainer
                  : styles.userMessageContainer
              }
            >
              <LinearGradient
                colors={msg.sender === "AI" ? ["#0000", "#CFCCFD"] : ["#0000", "#D9ECFC"]}
                style={msg.sender === "AI" ? styles.botMessage : styles.userMessage}
              >
                <Text
                  style={msg.sender === "AI" ? styles.botText : styles.userText}
                >
                  {msg.sender}: {msg.text}
                </Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            editable={!isStreaming}
          />
          <Button title="Send" onPress={handleSendMessage} disabled={isStreaming} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginTop: 90 },
  chatContainer: { flex: 1, marginBottom: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    backgroundColor: "black",
    borderRadius: 25,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    marginBottom: 5,
    borderRadius: 10,
  },
  userMessage: {
    padding: 10,
    borderRadius: 10,
  },
  userText: {
    color: "#000",
    fontWeight: "500",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    marginBottom: 5,
    borderRadius: 10,
  },
  botMessage: {
    padding: 10,
    borderRadius: 10,
  },
  botText: {
    color: "#000",
    fontWeight: "500",
  },
});

export default ChatbotScreen;
