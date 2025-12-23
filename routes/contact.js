const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact - Save contact form data
router.post("/", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    experience: req.body.experience,
  });

  try {
    const savedContact = await contact.save();
    res.status(201).json({
      message: "Application Submitted Successfully",
      data: savedContact,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error submitting form", error: err.message });
  }
});

// GET: Fetch all submissions (For Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    // Sort by newest first
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
