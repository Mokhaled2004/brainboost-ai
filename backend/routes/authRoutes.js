const express = require("express"); // Express framework
const { protect } = require("../middlewares/authMiddleware"); // Middleware to verify JWT tokens
const upload = require("../middlewares/uploadMiddleware"); // Multer middleware for file uploads

// Import controller functions for authentication
const {
  registerUser, // Handles user registration
  loginUser, // Handles user login
  getUserProfile, // Returns profile of the logged-in user
} = require("../controllers/authController");

const router = express.Router(); // Create a new Express Router instance

// =======================
// Authentication Endpoints
// =======================

// POST /api/auth/register
// Public route - Registers a new user
router.post("/register", registerUser);

// POST /api/auth/login
// Public route - Logs in an existing user and returns a token
router.post("/login", loginUser);

// GET /api/auth/profile
// Protected route - Requires valid token to access profile
router.get("/profile", protect, getUserProfile);

// =======================
// Image Upload Endpoint
// =======================

// POST /api/auth/upload-image
// Accepts a single image file with field name "image"
// Returns the public URL of the uploaded image
router.post("/upload-image", upload.single("image"), (req, res) => {
  // If no file is uploaded, return error
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Construct public URL for uploaded image
  const imageURL = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  // Respond with image URL
  res.status(200).json({ imageURL });
});

module.exports = router; // Export router to be mounted in server.js
