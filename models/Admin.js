// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This will store the HASHED password
});

module.exports = mongoose.model("Admin", adminSchema);
