const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  togglePinQuestion,
  updateQuestionNote,
  addQuestionsToSession,
} = require("../controllers/questionsController");

const router = express.Router();

router.post("/add", protect, addQuestionsToSession); // Add questions to a session
router.post("/:id/pin", protect, togglePinQuestion); // Pin or unpin a question
router.post("/:id/note", protect, updateQuestionNote); // Update question note

module.exports = router;
