export const createUserInFirestore = async (userData: any) => {
  console.log("Sending data to API:", userData);
  try {
    const response = await fetch("http://192.168.1.168:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        console.log("User already exists:", userData.email_address);
        return { alreadyExists: true };
      }
      throw new Error(data.error || "Failed to create user");
    }

    console.log("User successfully created in Firestore:", data);
    return { alreadyExists: false, data };
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    throw error;
  }
};



export const likePost = async (postId: string, userId: string): Promise<any> => {
  console.log("Toggling like for post with ID:", postId);
  try {
    const response = await fetch(`http://192.168.1.168:3000/api/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // Send userId in the body
    });

    if (!response.ok) {
      throw new Error("Failed to toggle like for post");
    }

    const data = await response.json();
    console.log("Post like toggled successfully:", data);
    return data;
  } catch (error) {
    console.error("Error toggling like for post:", error);
    throw error;
  }
};


export const fetchPosts = async (): Promise<any[]> => {
  console.log("Fetching posts...");
  try {
    const response = await fetch("http://192.168.1.168:3000/api/posts", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log("Posts fetched successfully:", data);
    return data; // Returns an array of posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const addPost = async (postData: {
  id: string;
  username: string;
  date: string;
  text: string;
  likes: number;
}): Promise<any> => {
  console.log("Adding post:", postData);
  try {
    const response = await fetch("http://192.168.1.168:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to add post");
    }

    const data = await response.json();
    console.log("Post added successfully:", data);
    return data; // Returns the newly created post data
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const fetchAllQuestions = async (): Promise<
  {
    question_id: string;
    text: string;
    options: string[];
  }[]
> => {
  console.log("Fetching all questions...");

  try {
    const response = await fetch("http://192.168.1.168:3000/api/forms/questions", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch all questions");
    }

    const data = await response.json();
    console.log("All questions fetched successfully:", data.questions);
    return data.questions;
  } catch (error) {
    console.error("Error fetching all questions:", error);
    throw error;
  }
};
