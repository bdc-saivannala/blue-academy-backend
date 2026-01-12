// seedAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Adjust path if needed

// REPLACE WITH YOUR MONGO ATLAS CONNECTION STRING
const MONGO_URI =
  "mongodb+srv://bluedata:bluedata123@cluster0.b3yntiv.mongodb.net/blue-blue_academy?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("Connected to DB...");

    // 1. Check if admin exists
    const existingAdmin = await Admin.findOne({ email: "admin@blue.com" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit();
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash("Admin@123$$$", 10);

    // 3. Save to DB
    await Admin.create({
      email: "admin@blue.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully!");
    process.exit();
  })
  .catch((err) => console.error(err));
