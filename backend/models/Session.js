const mongoose = require("mongoose"); // ODM library for MongoDB

// Define the schema for interview sessions
const sessionSchema = new mongoose.Schema(
  {
    // Reference to the User who owns this session
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Role in the interview (e.g., "interviewer", "candidate")
    role: { type: String, required: true },

    // Experience level of the participant
    experience: { type: String, required: true },

    // Topics to focus on during the session
    topicsToFocus: { type: String, required: true },

    // Optional description of the session
    description: String,

    // List of questions associated with this session
    // Array of ObjectIds referencing Question documents
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    // Automatically track creation and update times
    timestamps: true,
  }
);

// Compile schema into a Model and export
module.exports = mongoose.model("Session", sessionSchema);
