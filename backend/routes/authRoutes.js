const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    
    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1d" }
    );
    
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed admin route (FOR DEVELOPMENT ONLY)
// Remove or secure in production
router.post("/seed", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    const newAdmin = new Admin({ username: "admin", password: hashedPassword });
    await newAdmin.save();
    res.json({ message: "Admin created successfully! Use admin/admin123 to login." });
  } catch (error) {
    res.status(500).json({ error: "Admin might already exist or: " + error.message });
  }
});

module.exports = router;
