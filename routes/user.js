const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ================= USER AUTH =================

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, companyName, phoneNumber, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      companyName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials ❌" });

    res.json({ message: "Login successful ✅", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// ================= USER PROFILE SETTINGS =================

// Get profile
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Update profile
router.post("/profile/:id", async (req, res) => {
  try {
    const { fullName, companyName, phoneNumber, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, companyName, phoneNumber, email },
      { new: true }
    ).select("-password");
    res.json({ message: "Profile updated ✅", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
});

module.exports = router;
