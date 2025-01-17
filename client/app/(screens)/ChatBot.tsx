import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { sendMessageToChatbot } from "@/lib/api/api";

type Message = {
  sender: string;
  text: string;
};

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const response = await sendMessageToChatbot("Hello!");
        const botMessage: Message = { sender: "AI", text: response };
        setMessages([botMessage]);
      } catch (error) {
        console.error("Error fetching initial bot message:", error);
      }
    };

    fetchInitialMessage();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await sendMessageToChatbot(input);
      const botMessage: Message = { sender: "AI", text: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "AI",
        text: "Error connecting to the chatbot.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => {
          if (msg.sender === "AI") {
            return (
              <View key={index} style={styles.botMessageContainer}>
                <LinearGradient
                  colors={["#cdc1ff", "#e5d9f2"]}
                  style={styles.botMessage}
                >
                  <Text style={styles.botText}>
                    {msg.sender}: {msg.text}
                  </Text>
                </LinearGradient>
              </View>
            );
          } else {
            return (
              <View key={index} style={styles.userMessageContainer}>
                <LinearGradient
                  colors={["rgba(255, 255, 255, 1)", "rgba(115, 170, 176, 1)"]}
                  start={[0, 1]}
                  end={[0, 0]}
                  style={styles.userMessage}
                >
                  <Text style={styles.userText}>
                    {msg.sender}: {msg.text}
                  </Text>
                </LinearGradient>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
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
