const mongoose = require("mongoose"); // ODM library for MongoDB

// Define the schema for questions in a session
const questionSchema = new mongoose.Schema(
  {
    // The session this question belongs to
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },

    // Question text
    question: { type: String },

    // Answer text
    answer: { type: String },

    // Additional notes about the question
    note: { type: String },

    // Whether this question is pinned as important
    isPinned: { type: Boolean, default: false },
  },
  {
    // Track creation and update timestamps automatically
    timestamps: true,
  }
);

// Compile schema into a Model and export
module.exports = mongoose.model("Question", questionSchema);
