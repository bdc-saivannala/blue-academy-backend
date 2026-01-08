const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// POST /api/leads - Save a new lead
router.post("/", async (req, res) => {
  try {
    const { full_name, email, country_code, phone_number, interest } = req.body;

    // Validate required fields
    if (!full_name || !email || !phone_number || !interest) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newLead = await Lead.create({
      full_name,
      email,
      country_code,
      phone_number,
      interest,
    });

    // --- OPTIONAL: Trigger AI Assistant Here ---
    /* const aiPayload = {
        assistantId: "ae81a47b-cd38-40c9-b1c6-ed429bdb029f",
        assistantOverrides: {
            variableValues: {
                full_name: full_name,
                email: email,
                interest: interest
            }
        },
        customer: { number: `${country_code}${phone_number}` },
        phoneNumberId: "ac6f5747-cad0-41da-abb8-a828282a534e"
    };
    // axios.post('YOUR_AI_ENDPOINT', aiPayload)...
    */

    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error("Lead Save Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
