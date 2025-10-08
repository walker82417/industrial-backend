const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());

// ==================== MongoDB Connection ====================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ==================== Routes ====================

// 🧩 Auth & User Routes
const userRoutes = require("./routes/user"); 
app.use("/api/user", userRoutes);

// 🔐 Security Settings Routes
const securityRoutes = require("./routes/security");
app.use("/api/security", securityRoutes);

// 💳 Subscription Settings Routes
const subscriptionRoutes = require("./routes/subscription");
app.use("/api/subscription", subscriptionRoutes);

// ⚙️ Integration Settings Routes
const integrationRoutes = require("./routes/integration");
app.use("/api/integration", integrationRoutes);

// ==================== Default Test Route ====================
app.get("/", (req, res) => {
  res.send("🚀 Industrial Backend is live and running!");
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));
