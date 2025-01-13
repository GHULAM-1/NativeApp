const express = require("express");
const { addPost, getAllPosts, editPost, deletePost, likeOrUnlikePost } = require("../controllers/postController");

const router = express.Router();

router.post("/", addPost);
router.get("/", getAllPosts);
router.patch("/:postId", editPost);
router.delete("/:postId", deletePost);
router.patch("/:postId/like", likeOrUnlikePost);

module.exports = router;
