const db = require("../firebase/firebaseAdmin");

// Add Post
exports.addPost = async (req, res) => {
  const { id, username, date, text, likes, likedBy, author, imageUrl } = req.body;

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
      author,
      imageUrl,
    });
    res.status(201).json({ message: "Post created successfully!" });
  } catch (error) {
    console.error("Firestore Error:", error);
    res.status(500).json({ error: "Failed to create post", details: error.message });
  }
};

// Fetch All Posts
exports.getAllPosts = async (req, res) => {
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
};
exports.editPost = async (req, res) => {
    const { postId } = req.params; // Post ID from the request params
    const { email, text } = req.body; // Email and new post text from the request body
  
    if (!email || !text) {
      return res.status(400).json({ error: "Email and updated text are required" });
    }
  
    try {
      const postRef = db.collection("posts").doc(postId);
      const postSnapshot = await postRef.get();
  
      if (!postSnapshot.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const postData = postSnapshot.data();
  
      // Check if the requester is the author
      if (postData.author !== email) {
        return res.status(403).json({ error: "Unauthorized to edit this post" });
      }
  
      // Update the post
      await postRef.update({ text });
      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.error("Error editing post:", error);
      res.status(500).json({ error: "Failed to edit post", details: error.message });
    }
  };
  exports.deletePost = async (req, res) => {
    const { postId } = req.params; // Post ID from the request params
    const { email } = req.body; // Email of the user making the request
  
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
  
    try {
        const postRef = db.collection("posts").doc(postId.trim());
        const postSnapshot = await postRef.get();
  
      if (!postSnapshot.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const postData = postSnapshot.data();
  
      // Check if the requester is the author
      if (postData.author !== email) {
        return res.status(403).json({ error: "Unauthorized to delete this post" });
      }
  
      // Delete the post
      await postRef.delete();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post", details: error.message });
    }
  };
    
  exports.likeOrUnlikePost = async (req, res) => {
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
  };