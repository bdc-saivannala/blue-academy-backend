const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin"); // Import the model

// POST: Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the admin by email in MongoDB
    const admin = await Admin.findOne({ email });

    // If no admin found with that email
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // 2. Compare the password user typed vs the Hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);

    if (isMatch) {
      // Login Success
      // Note: In production, generate a real JWT here instead of a static string
      res.json({ success: true, token: "blue-academy-secret-token" });
    } else {
      // Login Failed (Wrong Password)
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
