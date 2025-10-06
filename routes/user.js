const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { fullName, companyName, phoneNumber, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      fullName,
      companyName,
      phoneNumber,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    res.json({ message: "Login successful ✅", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
