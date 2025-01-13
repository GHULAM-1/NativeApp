const db = require("../firebase/firebaseAdmin");

// Get All Questions from All Forms
exports.getAllQuestions = async (req, res) => {
  try {
    const formsSnapshot = await db.collection("forms").get();

    if (formsSnapshot.empty) {
      return res.status(404).json({ error: "No forms found" });
    }

    // Aggregate questions from all forms
    const questions = [];
    formsSnapshot.forEach((doc) => {
      const formData = doc.data();
      if (formData.questions && Array.isArray(formData.questions)) {
        questions.push(...formData.questions);
      }
    });

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching all questions:", error);
    res.status(500).json({
      error: "Failed to fetch all questions",
      details: error.message,
    });
  }
};


