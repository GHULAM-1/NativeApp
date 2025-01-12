const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config(); // Load environment variables

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express.js with Firebase!");
});

// Create User (No Authentication)
// Create User (No Authentication)
app.post("/api/users", async (req, res) => {
    console.log("Request Body:", req.body);
  
    const { id, name, email_address } = req.body;
  
    if (!id || !name || !email_address) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {

      // Check if a user with the same email already exists
      const usersSnapshot = await db.collection("users").where("email_address", "==", email_address).get();
      console.log(email_address);
        console.log(usersSnapshot);
      if (!usersSnapshot.empty) {
        console.log("User already exists with this email:", email_address);
        return res.status(409).json({ error: "User already exists" });
      }
  
      // Save user to Firestore
      await db.collection("users").doc(id).set({
        name,
        email_address,
      });
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error("Firestore Error:", error);
      res
        .status(500)
        .json({ error: "Failed to create user", details: error.message });
    }
  });
  
// Get User by ID (No Authentication)
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const userDoc = await db.collection("users").doc(id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ id, ...userDoc.data() });
  } catch (error) {
    console.error("Firestore Error:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve user", details: error.message });
  }
});

// Get All Users (No Authentication)
app.get("/api/users", async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(users);
  } catch (error) {
    console.error("Firestore Error:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve users", details: error.message });
  }
});
// Like or Unlike a Post
app.patch("/api/posts/:postId/like", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body; // Expect userId in the request body

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Retrieve the post from Firestore
    const postRef = db.collection("posts").doc(postId);
    const postSnapshot = await postRef.get();

    if (!postSnapshot.exists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const postData = postSnapshot.data();
    const likedBy = postData.likedBy || []; // Default to an empty array if `likedBy` doesn't exist
    const likes = postData.likes || 0;

    let updatedLikes = likes;
    let updatedLikedBy = [...likedBy];

    // Check if the user has already liked the post
    if (likedBy.includes(userId)) {
      // User has already liked the post, so we unlike it
      updatedLikedBy = likedBy.filter((id) => id !== userId);
      updatedLikes -= 1;
    } else {
      // User hasn't liked the post, so we like it
      updatedLikedBy.push(userId);
      updatedLikes += 1;
    }

    // Update the post in Firestore
    await postRef.update({
      likedBy: updatedLikedBy,
      likes: updatedLikes,
    });

    res.status(200).json({
      id: postId,
      likedBy: updatedLikedBy,
      likes: updatedLikes,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
});

// Add Post
// Create Post
app.post("/api/posts", async (req, res) => {
  const { id, username, date, text, likes, likedBy } = req.body;

  // Validate input
  if (!id || !username || !date || !text || likes === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.collection("posts").doc(id).set({
      username,
      date,
      text,
      likes,
      likedBy: likedBy || [],
    });
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Firestore Error:", error);
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
});

// Fetch All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const postsSnapshot = await db.collection("posts").get();
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(posts);
  } catch (error) {
    console.error("Firestore Error:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve posts", details: error.message });
  }
});
// Get All Questions from All Forms
app.get("/api/forms/questions", async (req, res) => {
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
});


//to add questions
// const form = {
//   id: "form1",
//   form_name: "General Survey",
//   questions: [
//     {
//       question_id: "q1",
//       text: "Do you like programming?",
//       options: ["YES", "NO", "Maybe"],
//     },
//     {
//       question_id: "q2",
//       text: "What is your preferred programming language?",
//       options: ["JavaScript", "Python", "Java", "C++"],
//     },
//     {
//       question_id: "q3",
//       text: "Do you enjoy working remotely?",
//       options: ["YES", "NO", "Sometimes"],
//     },
//     {
//       question_id: "q4",
//       text: "Do you prefer front-end or back-end development?",
//       options: ["Front-end", "Back-end", "Full-stack"],
//     },
//     {
//       question_id: "q5",
//       text: "Are you interested in learning new technologies?",
//       options: ["YES", "NO", "Maybe"],
//     },
//   ],
// };

// // Function to add the form to Firestore
// const addFormToFirestore = async () => {
//   try {
//     await db.collection("forms").doc(form.id).set(form);
//     console.log(`Form ${form.id} added successfully`);
//   } catch (error) {
//     console.error("Error adding form:", error);
//   }
// };

// addFormToFirestore();

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
