const express = require("express");
const router = express.Router();
const CourseApplication = require("../models/CourseApplication");

router.post("/", async (req, res) => {
  try {
    const newApp = new CourseApplication(req.body);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const apps = await CourseApplication.find().sort({ submittedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
