const mongoose = require("mongoose"); // ODM library for MongoDB

// Define the schema (blueprint) for User collection
const UserSchema = new mongoose.Schema(
  {
    // User's full name
    name: { type: String, required: true }, // must be provided

    // Unique email address for login/identification
    email: { type: String, required: true, unique: true }, // unique enforces no duplicates in DB

    // Hashed password for authentication
    password: { type: String, required: true },

    // Optional profile image URL
    profileImageUrl: { type: String, default: null },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Compile the schema into a Model and export
module.exports = mongoose.model("User", UserSchema);
