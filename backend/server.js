// Load environment variables from .env into process.env
require("dotenv").config();

const express = require("express"); // Express framework for building the API
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing
const path = require("path"); // Node.js utility for handling file and directory paths

const connectDB = require("./config/db"); // Custom function to connect to MongoDB
const authRoutes = require("./routes/authRoutes"); // Authentication-related API routes
const sessionRoutes = require("./routes/sessionRoutes"); // Session-related API routes
const questionRoutes = require("./routes/questionRoutes"); // Question-related API routes
const { protect } = require("./middlewares/authMiddleware"); // Middleware for protecting routes

const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

const app = express(); // Initialize the Express application

// Middleware: Enable CORS for all origins and selected HTTP methods/headers
app.use(
  cors({
    origin: "http://localhost:5173", // Allow any origin (⚠️ Consider restricting in production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB database
connectDB();

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Define the port (from env or default to 5000) and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
