require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const courseRoutes = require("./routes/courses");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const applicationRoutes = require("./routes/applications");
const leadRoutes = require("./routes/leads");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://www.blueacademy.ai/",
      "https://blue-academy-pre-sales-v1-0-1.onrender.com/chat-widget/chat-widget.js",
      "http://localhost:3000",
    ], // Allow requests ONLY from your widget
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.use("/api/courses", courseRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/leads", leadRoutes);

// Base Route (Health Check)
app.get("/", (req, res) => {
  res.send("Blue Academy Backend is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
