const express = require("express");
const router = express.Router();

// POST: Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Hardcoded Admin Credentials (You can change these)
  const ADMIN_EMAIL = "admin@blue.com";
  const ADMIN_PASS = "admin123";

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    // Login Success
    res.json({ success: true, token: "blue-academy-secret-token" });
  } else {
    // Login Failed
    res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
});

module.exports = router;
