const db = require("../firebase/firebaseAdmin");

// Create User (No Authentication)
exports.createUser = async (req, res) => {
  console.log("Request Body:", req.body);

  const { id, name, email_address } = req.body;

  if (!id || !name || !email_address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Check if a user with the same email already exists
    const usersSnapshot = await db
      .collection("users")
      .where("email_address", "==", email_address)
      .get();

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
};

// Get User by ID
exports.getUserById = async (req, res) => {
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
};

// Get All Users
exports.getAllUsers = async (req, res) => {
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
};
