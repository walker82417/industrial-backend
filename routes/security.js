const express = require("express");
const router = express.Router();

// Fake data for now; later connect to MongoDB collection
const notifications = [
  { id: 1, message: "System check complete.", type: "info" },
  { id: 2, message: "Subscription renewal due in 3 days.", type: "warning" },
];

router.get("/notifications", (req, res) => {
  res.json(notifications);
});

module.exports = router;

