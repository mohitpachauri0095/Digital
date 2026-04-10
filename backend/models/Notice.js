const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Exam', 'Placement', 'Event', 'General'], 
    default: 'General' 
  },
  fileUrl: { type: String }, // Path to uploaded PDF/image
  aiSummary: { type: String }, // AI generated summary
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
