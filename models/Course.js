const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: String, // CKEditor HTML
  category: String,
  image: String,

  rating: { type: String, default: "4.8" },
  duration: String,
  fee: String,
  nextBatch: String,

  // --- Lists ---
  badges: [String],
  heroFeatures: [String],
  skills: [String], // Array of strings (e.g., ["React", "Node"])

  // --- Rich Text ---
  prerequisites: String, // CHANGED to String for CKEditor HTML
  targetAudience: [String],

  // --- Complex Data ---
  curriculum: [{ title: String, details: String }],
  instructors: [{ name: String, role: String, company: String, image: String }],
  jobRoles: [{ role: String, salary: String, demand: String }],
  reviews: [{ name: String, role: String, text: String, image: String }],
  faqs: [{ q: String, a: String }],
});

module.exports = mongoose.model("Course", CourseSchema);
