const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  aiReply: { type: String, required: true },
  studentType: { type: String, default: 'General' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
