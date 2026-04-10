const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) return res.status(400).json({ error: "Message is required" });
    
    // Check if API key is provided
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_api_key_here") {
      return res.json({ reply: "AI features are currently unavailable because the API key is not configured." });
    }

    // Fetch the 10 most recent notices to give context to the AI
    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(10);
    
    const contextStr = recentNotices.map((n, i) => 
      `Notice ${i+1}:
Title: ${n.title}
Category: ${n.category}
Summary: ${n.aiSummary || n.content.substring(0, 100)}`
    ).join("\n\n");

    const systemPrompt = `You are a helpful student assistant for a college digital notice board.
Answer the student's query clearly and concisely based on the following recent notices.
If the answer is not in the notices, politely inform them that you do not have information about that right now.

Here are the recent notices:
${contextStr}

Student Query: ${message}
Your Response:`;

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: systemPrompt,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

module.exports = router;
