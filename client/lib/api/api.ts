import { EXPO_IP_ADDRESS } from "@env";

const IP_KEY = EXPO_IP_ADDRESS;

export const createUserInFirestore = async (userData: any) => {
  console.log("Sending data to API:", userData);
  try {
    const response = await fetch(`http://${IP_KEY}:3000/api/users`, {
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
    const response = await fetch(`http://${IP_KEY}:3000/api/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), 
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
    const response = await fetch(`http://${IP_KEY}:3000/api/posts`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log("Posts fetched successfully:", data);
    return data;
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
  author:string,
  imageUrl?: string; 
}): Promise<any> => {
  console.log("Adding post:", postData);
  try {
    const response = await fetch(`http://${IP_KEY}:3000/api/posts`, {
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
    return data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const fetchAllQuestions = async (): Promise<
  {
    question_id: string;
    text: string;
    options: { label: string; text: string }[];
  }[]
> => {
  console.log("Fetching all questions...");

  try {
    const response = await fetch(`http://${IP_KEY}:3000/api/forms/questions`, {
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


export const editPost = async (
  postId: string,
  email: string,
  updatedText: string,
  imageUrl: string
): Promise<any> => {
  console.log("Editing post with ID:", postId);
  try {
    const response = await fetch(`http://${IP_KEY}:3000/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, text: updatedText }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Unauthorized to edit this post");
      }
      if (response.status === 404) {
        throw new Error("Post not found");
      }
      throw new Error("Failed to edit post");
    }

    const data = await response.json();
    console.log("Post edited successfully:", data);
    return data;
  } catch (error) {
    console.error("Error editing post:", error);
    throw error;
  }
};
export const deletePost = async (postId: string, email: string): Promise<any> => {
  console.log("Deleting post with ID:", postId);
  try {
    const response = await fetch(`http://${IP_KEY}:3000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Unauthorized to delete this post");
      }
      if (response.status === 404) {
        throw new Error("Post not found");
      }
      throw new Error("Failed to delete post");
    }

    const data = await response.json();
    console.log("Post deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri, 
    type: "image/jpeg", 
    name: "image.jpg",
  } as any); 

  formData.append("upload_preset", "Career_Quest"); 
  formData.append("cloud_name", "dyxt44zjj"); 

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dyxt44zjj/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return data.secure_url;
    } else {
      console.error("Cloudinary Upload Error:", data);
      throw new Error(data.error.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const sendMessageToChatbot = async (message: string) => {
  try {
    const response = await fetch("http://192.168.1.168:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.response; 
  } catch (error) {
    console.error("Error in API call:", error);
    throw error; 
  }
};
