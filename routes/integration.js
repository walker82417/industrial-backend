const express = require("express");
const router = express.Router();

// Placeholder integrations list
let integrations = [
  { name: "Google Cloud", connected: true },
  { name: "AWS IoT", connected: false },
  { name: "Azure", connected: false },
];

router.get("/", (req, res) => {
  res.json(integrations);
});

router.post("/", (req, res) => {
  integrations = req.body;
  res.json({ message: "Integrations updated ✅", integrations });
});

module.exports = router;

