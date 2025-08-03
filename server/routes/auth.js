import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  // Destructure all expected fields from req.body, including avatar
  const { username, email, password, avatar } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    // Correctly pass the destructured data to User.create()
    const newUser = await User.create({ username, email, password, avatar }); // <--- FIXED HERE

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      // Use newUser here
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      }, // Use newUser and include avatar
    });
  } catch (err) {
    console.error("Registration error:", err); // Log the full error for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }, // <--- FIXED TYPO (namename to username) and added avatar
    });
  } catch (err) {
    console.error("Login error:", err); // Log the full error for debugging
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
