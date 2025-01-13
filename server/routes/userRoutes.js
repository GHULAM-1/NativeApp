const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;
