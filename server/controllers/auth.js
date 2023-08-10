// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import jsonwebtoken for auth tokens
import jwt from "jsonwebtoken";

// Import User model
import User from "../models/User.js";

/* REGISTER USER */

export const register = async (req, res) => {
  try {
    // Destructure request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate salt for password hashing
    const salt = await bcrypt.genSalt();

    // Hash password
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user object with request body and hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Generate random profile views
      impressions: Math.floor(Math.random() * 10000), // Generate random feed impressions
    });

    // Save user to DB
    const savedUser = await newUser.save();

    // Send response with user object
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */

export const login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });

    // If user does not exist, return error
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Compare hashed password to see if it matches
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return error
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    // Sign JWT token and include user id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove password from user object before sending response
    delete user.password;

    // Send response with token and user object
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
