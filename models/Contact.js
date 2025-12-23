const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: String,
  experience: String, // Tracks if they are a Student or Professional
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", ContactSchema);
