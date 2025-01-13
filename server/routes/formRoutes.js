const express = require("express");
const { getAllQuestions } = require("../controllers/formController");

const router = express.Router();

// Get all questions from all forms
router.get("/questions", getAllQuestions);

module.exports = router;
