// Import Mongoose
import mongoose from "mongoose";

// Create User Schema
const UserSchema = new mongoose.Schema(
  {
    // First Name - Required, min 2, max 50 chars
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    // Last Name - Required, min 2, max 50 chars
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    // Email - Required, unique, max 50 chars
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    // Password - Required, min 5 chars
    password: {
      type: String,
      required: true,
      min: 5,
    },

    // Profile picture file path
    picturePath: {
      type: String,
      default: "",
    },

    // Array of friend IDs
    friends: {
      type: Array,
      default: [],
    },

    // Location
    location: String,

    // Occupation
    occupation: String,

    // Number of profile views
    viewedProfile: Number,

    // Number of feed impressions
    impressions: Number,
  },

  // Add timestamp fields
  { timestamps: true }
);

// Create User model from schema
const User = mongoose.model("User", UserSchema);

// Export User model
export default User;
