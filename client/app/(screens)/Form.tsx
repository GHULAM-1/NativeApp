import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import { fetchAllQuestions } from "@/lib/api/api";
import { LinearGradient } from "expo-linear-gradient";

const QuizScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formQuestions, setFormQuestions] = useState<
    {
      question_id: string;
      text: string;
      options: { label: string; text: string }[];
    }[]
  >([]);
  const [lastOptionSelected, setLastOptionSelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchAllQuestions();
        console.log("Fetched questions:", fetchedQuestions);
        setFormQuestions(fetchedQuestions); // Store questions in state
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    loadQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < formQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setLastOptionSelected(false); // Reset for the next question
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setLastOptionSelected(false); // Reset for the previous question
    }
  };

  const handleOptionSelect = (index: number) => {
    const selectedOption = currentQuestion.options[index];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.question_id]: selectedOption.label, // Map question_id to the selected label
    }));
    setLastOptionSelected(true);

    if (currentQuestionIndex < formQuestions.length - 1) {
      handleNext(); // Move to the next question
    }
  };

  const next = require("../../assets/careerquest logos and icons/icons/next.png");
  const back = require("../../assets/careerquest logos and icons/icons/previous.png");

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (formQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No questions available.</Text>
      </View>
    );
  }

  const currentQuestion = formQuestions[currentQuestionIndex];

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* Question */}
        <Text style={styles.question}>{currentQuestion.text}</Text>

        {/* Options */}
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionSelect(index)}
          >
            <LinearGradient
              colors={["#FFFFFF", "#CFCCFD"]}
              style={styles.gradientButton}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Image source={back} style={styles.image} contentFit="contain" />
          </TouchableOpacity>

          <Text style={styles.pagination}>
            {currentQuestionIndex + 1} of {formQuestions.length}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentQuestionIndex === formQuestions.length - 1}
          >
            <Image source={next} style={styles.image} contentFit="contain" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        {currentQuestionIndex === formQuestions.length - 1 &&
          lastOptionSelected && (
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={async () => {
                try {
                  const response = await fetch(
                    "http://192.168.1.168:5000/chat",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ responses: selectedAnswers }),
                    }
                  );

                  const data = await response.json();
                  console.log("Chatbot response:", data);

                  // Navigate to CareerSuggestionsScreen with chatbot suggestions
                  router.push({
                    pathname: "/Form-Result",
                    params: {
                      suggestions: JSON.stringify(data.response), // Pass the suggestions as a JSON string
                    },
                  });
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              }}
            >
              Submit
            </Button>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    borderRadius: 15,
    borderColor:"#000",
    borderWidth:1.2,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F7FA",
    padding: 20,
  },
  image: {
    width: 70,
    height: 30,
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
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    marginVertical: 10,
    width: "80%",
    alignItems: "flex-start",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    textAlign: "left",
    fontWeight: "600",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 30,
    width: "90%",
  },
  pagination: {
    fontSize: 14,
    color: "#2A2A2A",
    fontWeight: "500",
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#0000FF",
  },
});

export default QuizScreen;
