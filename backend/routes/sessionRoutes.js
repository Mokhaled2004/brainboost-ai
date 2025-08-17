const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/create", protect, createSession); // Create a new session
router.get("/my-sessions", protect, getMySessions); // Get all sessions for the authenticated user
router.get("/:id", protect, getSessionById); // Get a specific session by ID
router.delete("/:id", protect, deleteSession); // Delete a session by ID/

module.exports = router;
