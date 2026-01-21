const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    // --- Candidate Details ---
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // --- Course Details ---
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Links to your existing Course model
      required: true,
    },
    courseTitle: { type: String }, // Stored for easier record keeping

    // --- Payment Status ---
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["Initiated", "Paid", "Failed"],
      default: "Initiated",
    },

    // --- Razorpay Info (Updated later after payment) ---
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
