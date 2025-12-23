const mongoose = require("mongoose");

const CourseApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: String, // Student, 1-3 years, etc.

  // Specific Course Data
  courseTitle: { type: String, required: true },
  courseSlug: { type: String, required: true },

  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseApplication", CourseApplicationSchema);
