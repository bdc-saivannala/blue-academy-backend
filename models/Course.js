const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    // --- 1. ESSENTIALS ---
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: String, // HTML from CustomEditor
    category: String,
    image: String,
    bannerImage: String,

    // --- 2. PRICING & STATS ---
    rating: { type: String, default: "" },
    duration: String,
    fee: String,
    nextBatch: String, // Date string from input type="date"
    level: String, // e.g., "Beginner to Intermediate"

    // --- 3. HIGHLIGHTS & AUDIENCE (Arrays) ---
    badges: [String],
    heroFeatures: [String],
    skills: [String],
    targetAudience: [String],
    prerequisites: String, // HTML from CustomEditor

    // --- 4. OUTCOMES ---
    outcomes: String, // HTML from CustomEditor

    // --- 5. CURRICULUM (Deeply Nested) ---
    curriculum: [
      {
        title: String,
        details: String, // Module Description (HTML)
        sections: [
          {
            title: String,
            concepts: String, // HTML from CustomEditor
            labs: String, // HTML from CustomEditor
            tools: [String], // Array from TagInput
          },
        ],
      },
    ],

    // --- 6. CAPSTONE PROJECTS ---
    capstones: [
      {
        title: String,
        details: String, // HTML from CustomEditor
        tools: [String], // Array from TagInput
      },
    ],

    // --- 7. Leaders ---
    leaders: [
      {
        name: String,
        role: String,
        company: String,
        image: String,
      },
    ],

    // --- 7. INSTRUCTORS ---
    instructors: [
      {
        name: String,
        role: String,
        company: String,
        image: String,
      },
    ],

    // --- 8. JOB ROLES ---
    jobRoles: [
      {
        role: String,
        salary: String,
        demand: String,
      },
    ],

    // --- 9. REVIEWS & FAQS ---
    reviews: [
      {
        name: String,
        role: String,
        text: String, // HTML
        image: String,
      },
    ],
    faqs: [
      {
        q: String,
        a: String, // HTML
      },
    ],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
