const express = require("express");
const cors = require("cors");
const db = require("./firebase/firebaseAdmin");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/forms", formRoutes);

const form = {
  id: "form1",
  form_name: "General Survey",
  questions: [
    {
      question_id: "q1",
      text: "When faced with a problem, you prefer to:",
      options: [
        "Analyze it logically and systematically.",
        "Think outside the box for creative solutions.",
        "Discuss it with others to gather diverse perspectives.",
        "Trust my instincts and previous experiences.",
      ],
    },
    {
      question_id: "q2",
      text: "In a typical workday, I prefer:",
      options: [
        "Structured tasks with clear guidelines.",
        "Opportunities to innovate and create.",
        "Collaboration in team projects.",
        "Independence in my work.",
      ],
    },
    {
      question_id: "q3",
      text: "I am most skilled at:",
      options: [
        "Technical tasks and analysis.",
        "Artistic and creative endeavors.",
        "Interpersonal communication and teamwork.",
        "Problem-solving based on experience.",
      ],
    },
    {
      question_id: "q4",
      text: "I find satisfaction in:",
      options: [
        "Achieving measurable results.",
        "Expressing my creativity.",
        "Helping others and building relationships.",
        "Navigating challenges successfully.",
      ],
    },
    {
      question_id: "q5",
      text: "I enjoy learning about:",
      options: [
        "Scientific or technical subjects.",
        "Art, culture, and design.",
        "Psychology and human behavior.",
        "Practical skills and hands-on tasks.",
      ],
    },
    {
      question_id: "q6",
      text: "I feel comfortable using technology to:",
      options: [
        "Analyze data and statistics.",
        "Create art or design projects.",
        "Communicate and collaborate with others.",
        "Automate tasks and improve efficiency.",
      ],
    },
    {
      question_id: "q7",
      text: "In a group setting, I usually:",
      options: [
        "Take charge and lead the discussion.",
        "Contribute creative ideas.",
        "Facilitate communication among members.",
        "Work independently and share results later.",
      ],
    },
    {
      question_id: "q8",
      text: "I prefer to work on projects that:",
      options: [
        "Follow a clear plan and timeline.",
        "Allow for flexibility and creative expression.",
        "Involve teamwork and collaboration.",
        "Are self-directed and independent.",
      ],
    },
    {
      question_id: "q9",
      text: "I feel most accomplished when:",
      options: [
        "I complete a challenging task successfully.",
        "I create something unique and impactful.",
        "I help someone achieve their goals.",
        "I find a novel solution to a problem.",
      ],
    },
    {
      question_id: "q10",
      text: "I enjoy tackling:",
      options: [
        "Logical puzzles and problems.",
        "Artistic projects and crafts.",
        "Social issues and community challenges.",
        "Technical challenges that require hands-on work.",
      ],
    },
    {
      question_id: "q11",
      text: "In social situations, I am usually:",
      options: [
        "Reserved and observant.",
        "Outgoing and energetic.",
        "Supportive and empathetic.",
        "Independent and self-reliant.",
      ],
    },
    {
      question_id: "q12",
      text: "When faced with stress, I tend to:",
      options: [
        "Analyze the situation logically to find a solution.",
        "Seek creative outlets or activities.",
        "Reach out for support from friends or family.",
        "Retreat and reflect on my own.",
      ],
    },
    {
      question_id: "q13",
      text: "I prefer to make decisions based on:",
      options: [
        "Facts and data.",
        "My feelings and intuition.",
        "Input from others.",
        "My personal experiences.",
      ],
    },
    {
      question_id: "q14",
      text: "In a team, I often take on the role of:",
      options: [
        "The planner or organizer.",
        "The innovator or creator.",
        "The mediator or supporter.",
        "The independent worker.",
      ],
    },
    {
      question_id: "q15",
      text: "I feel most fulfilled when:",
      options: [
        "I achieve personal goals.",
        "I express my creativity.",
        "I help others succeed.",
        "I overcome challenges.",
      ],
    },
    {
      question_id: "q16",
      text: "I am most energized by:",
      options: [
        "Solving complex problems.",
        "Exploring new ideas and concepts.",
        "Engaging with people and building relationships.",
        "Working on projects that require focus and independence.",
      ],
    },
    {
      question_id: "q17",
      text: "My ideal work environment is:",
      options: [
        "A structured office with defined roles.",
        "A creative studio or workshop.",
        "A collaborative space with open communication.",
        "A flexible workspace where I can control my tasks.",
      ],
    },
    {
      question_id: "q18",
      text: "I prefer to communicate by:",
      options: [
        "Writing detailed reports or emails.",
        "Sharing visual presentations or designs.",
        "Discussing ideas face-to-face.",
        "Using practical demonstrations.",
      ],
    },
    {
      question_id: "q19",
      text: "I often find myself daydreaming about:",
      options: [
        "Achieving my career goals.",
        "Creating something artistic.",
        "Helping others and making a difference.",
        "Exploring new possibilities independently.",
      ],
    },
    {
      question_id: "q20",
      text: "I am motivated by:",
      options: [
        "Achievements and recognition.",
        "Personal expression and creativity.",
        "Building relationships and community.",
        "Mastering skills and knowledge.",
      ],
    },
    {
      question_id: "q21",
      text: "When working on a task, I prefer:",
      options: [
        "Following established procedures.",
        "Experimenting with new methods.",
        "Collaborating with others for input.",
        "Working at my own pace.",
      ],
    },
    {
      question_id: "q22",
      text: "In my spare time, I enjoy:",
      options: [
        "Reading or working on puzzles.",
        "Painting, drawing, or crafting.",
        "Volunteering or helping friends.",
        "Engaging in DIY projects or repairs.",
      ],
    },
    {
      question_id: "q23",
      text: "I feel most comfortable in:",
      options: [
        "Predictable and familiar situations.",
        "Dynamic and creative environments.",
        "Supportive and collaborative settings.",
        "Independent and self-managed tasks.",
      ],
    },
    {
      question_id: "q24",
      text: "When I need to learn something new, I:",
      options: [
        "Research thoroughly and analyze the information.",
        "Look for creative ways to apply the knowledge.",
        "Discuss it with others to gain insights.",
        "Practice hands-on until I understand.",
      ],
    },
    {
      question_id: "q25",
      text: "I am best at:",
      options: [
        "Logical reasoning and analysis.",
        "Creative thinking and artistic expression.",
        "Building rapport and understanding others.",
        "Practical problem-solving and execution.",
      ],
    },
    {
      question_id: "q26",
      text: "If I encounter a setback, I tend to:",
      options: [
        "Reassess my strategy and try again.",
        "Seek inspiration to re-energize my approach.",
        "Talk it out with supportive friends or family.",
        "Reflect on what I can learn from the experience.",
      ],
    },
    {
      question_id: "q27",
      text: "My friends describe me as:",
      options: [
        "Analytical and thoughtful.",
        "Creative and inspiring.",
        "Kind and supportive.",
        "Resourceful and practical.",
      ],
    },
    {
      question_id: "q28",
      text: "I tend to prioritize:",
      options: [
        "Achieving results and goals.",
        "Expressing my creativity.",
        "Building connections and relationships.",
        "Accomplishing tasks efficiently.",
      ],
    },
    {
      question_id: "q29",
      text: "When working on a team project, I usually:",
      options: [
        "Organize the tasks and set deadlines.",
        "Contribute innovative ideas.",
        "Ensure everyone feels included and valued.",
        "Take responsibility for my part independently.",
      ],
    },
    {
      question_id: "q30",
      text: "I believe my strengths lie in:",
      options: [
        "Data analysis and logical reasoning.",
        "Creativity and artistic talent.",
        "Empathy and interpersonal skills.",
        "Practical skills and self-sufficiency.",
      ],
    },
    {
      question_id: "q31",
      text: "I feel happiest when:",
      options: [
        "I achieve something I worked hard for.",
        "I create something that resonates with others.",
        "I help someone in need.",
        "I complete a challenging project.",
      ],
    },
    {
      question_id: "q32",
      text: "I often seek out experiences that:",
      options: [
        "Challenge my analytical skills.",
        "Allow me to express my creativity.",
        "Help me connect with others.",
        "Enable me to work independently.",
      ],
    },
    {
      question_id: "q33",
      text: "When I think about my future, I envision:",
      options: [
        "A successful career in a stable field.",
        "A life filled with creativity and artistic endeavors.",
        "Making a positive impact on others' lives.",
        "Achieving personal freedom and independence.",
      ],
    },
    {
      question_id: "q34",
      text: "In conflict situations, I tend to:",
      options: [
        "Analyze the facts and find a logical solution.",
        "Look for creative compromises.",
        "Try to understand everyone's feelings and perspectives.",
        "Assert my viewpoint while maintaining independence.",
      ],
    },
    {
      question_id: "q35",
      text: "I prefer to work on:",
      options: [
        "Projects that require analytical skills.",
        "Creative projects that allow for self-expression.",
        "Collaborative projects that involve teamwork.",
        "Independent projects that I can manage alone.",
      ],
    },
  ],
};

// Function to add the form to Firestore
const addFormToFirestore = async () => {
  try {
    await db.collection("forms").doc(form.id).set(form);
    console.log(`Form ${form.id} added successfully`);
  } catch (error) {
    console.error("Error adding form:", error);
  }
};

// addFormToFirestore();

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
