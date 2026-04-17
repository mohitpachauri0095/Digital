const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Save to database
    const newMessage = new ContactMessage({
      name,
      email,
      message,
    });
    await newMessage.save();

    // Acknowledge frontend
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ error: 'Failed to submit contact message' });
  }
});

module.exports = router;
