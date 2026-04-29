const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');

// POST /api/events/register
router.post('/register', async (req, res) => {
  try {
    const { eventId, eventName, studentName, studentEmail, studentId, studentType, transactionId } = req.body;

    if (!eventId || !eventName || !studentName || !studentEmail || !studentId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user already registered for this event
    const existingRegistration = await EventRegistration.findOne({ eventId, studentEmail });
    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this event with this email' });
    }

    // Save to database
    const newRegistration = new EventRegistration({
      eventId,
      eventName,
      studentName,
      studentEmail,
      studentId,
      studentType,
      transactionId
    });
    
    await newRegistration.save();

    res.status(201).json({ success: true, message: 'Successfully registered for ' + eventName });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ error: 'Failed to register for the event' });
  }
});

module.exports = router;
