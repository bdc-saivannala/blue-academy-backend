const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// POST /api/enrollments
// Description: Save candidate info before payment starts
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course_id, course_title, amount, status } =
      req.body;

    // 1. Validation
    if (!name || !email || !phone || !course_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // 2. Create new Enrollment Record
    const newEnrollment = new Enrollment({
      name,
      email,
      phone,
      courseId: course_id, // Maps to 'courseId' in model
      courseTitle: course_title,
      amount,
      status: status || "Initiated",
    });

    // 3. Save to MongoDB
    const savedEnrollment = await newEnrollment.save();

    res.status(201).json({
      success: true,
      message: "Enrollment Initiated",
      data: savedEnrollment,
    });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});

// GET /api/enrollments
// Description: Get all enrollments for the Admin Dashboard
router.get("/", async (req, res) => {
  try {
    // Fetch all enrollments and sort by newest first
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    console.error("Fetch Enrollments Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// POST /api/enrollments/confirm
// Description: Update status to "Paid" after Razorpay success
router.post("/confirm", async (req, res) => {
  try {
    const { enrollmentId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!enrollmentId || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Find the enrollment and update it
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      {
        status: "Paid",
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        updatedAt: Date.now()
      },
      { new: true } // Returns the updated document
    );

    if (!updatedEnrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Payment Verified & Enrollment Confirmed",
      data: updatedEnrollment,
    });

  } catch (error) {
    console.error("Payment Confirmation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

module.exports = router;
