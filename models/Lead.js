const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country_code: {
    type: String,
    default: "+91",
  },
  phone_number: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lead", LeadSchema);
