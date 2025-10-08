const express = require("express");
const router = express.Router();

// Temporary in-memory data
let subscription = {
  plan: "Free",
  renewalDate: "2025-12-31",
};

router.get("/", (req, res) => {
  res.json(subscription);
});

router.post("/", (req, res) => {
  subscription = req.body;
  res.json({ message: "Subscription updated ✅", subscription });
});

module.exports = router;

