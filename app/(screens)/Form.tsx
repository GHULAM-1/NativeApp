import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { questions } from "@/lib/data'/form-data";
import { Question } from "@/lib/types/form-type";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { Image } from "expo-image";

const QuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  const currentQuestion: Question = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleOptionSelect = (index: number) => {
    // Mark the current question as answered
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = true;
    setAnswers(updatedAnswers);

    // Move to the next question
    handleNext();
  };
  const next = require("../../assets/careerquest logos and icons/icons/next.png");
  const back = require("../../assets/careerquest logos and icons/icons/previous.png");

  const allQuestionsAnswered = answers.every((answer) => answer);

  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.container}>
        {/* Question */}
        <Text style={styles.question}>{currentQuestion.question}</Text>

        {/* Options */}
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleOptionSelect(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
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
            {currentQuestionIndex + 1} of {questions.length}
          </Text>

          <TouchableOpacity
            onPress={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            <Image source={next} style={styles.image} contentFit="contain" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        {allQuestionsAnswered &&
          currentQuestionIndex === questions.length - 1 && (
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={() => router.push("/Form-Result")}
            >
              Submit
            </Button>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    top: 40,
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
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    elevation: 2,
    width: "80%",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    width: "80%",
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
