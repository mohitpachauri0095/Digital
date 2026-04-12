const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key" });

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Fetch context from DB so the AI knows what's going on.
    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5);
    let noticesData = "Here are the latest college notices:\\n";
    recentNotices.forEach((n, idx) => {
      noticesData += `${idx + 1}. Title: ${n.title}, Category: ${n.category}, Content: ${n.content}\\n`;
    });

    const prompt = `You are a helpful and polite "AI Notice Assistant" for a college digital notice board.
The student asked: "${message}"

Context (Latest Notices): 
${noticesData}

Answer the student's question based on the context above. If the context doesn't have the exact answer or their question is general, be helpful and conversational. Keep your response concise (3-4 sentences max). Do not use markdown like asterisks in your response; plain text is best.`;

    let aiResponseText = null;
    let shouldUseFallback = true;
    
    // Attempt to call Gemini AI API
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_api_key_here" && process.env.GEMINI_API_KEY !== "dummy_key") {
      try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });
        
        aiResponseText = response.text || "I'm having trouble thinking, but you can check out the notices on the board!";
        shouldUseFallback = false;
        res.json({ reply: aiResponseText });
      } catch (apiError) {
        console.error("Gemini API Error, falling back to mock logic:", apiError.message);
        shouldUseFallback = true;
      }
    } 

    if (shouldUseFallback) {
      // Intelligent fallback simulating an AI response for demonstration purposes
      const lowercaseMsg = message.toLowerCase();
      
      // Handle greetings
      if (/^(hi|hello|hey|hee|greetings|hola)/.test(lowercaseMsg)) {
        return res.json({ reply: "Hello! I'm the AI Notice Assistant. How can I help you with your college updates today?" });
      }
      
      // Match against notices
      let foundNotice = recentNotices.find(n => 
        lowercaseMsg.includes((n.category || '').toLowerCase()) || 
        lowercaseMsg.includes('notice') || 
        n.title.toLowerCase().includes(lowercaseMsg) ||
        lowercaseMsg.includes(n.title.toLowerCase())
      );
      
      if (foundNotice && lowercaseMsg.length > 3) {
        res.json({ reply: `Based on your question, here's what I found: ${foundNotice.title}. ${foundNotice.aiSummary || foundNotice.content.substring(0, 80)}... Let me know if you need more details!` });
      } else {
        // Generic fallback that sounds AI-like
        const genericResponses = [
          "I'm here to help! I can provide details about Exams, Placements, Events, and other General notices. What specific topic are you interested in?",
          "I couldn't find a specific notice matching your exact phrasing, but feel free to ask about exams or upcoming events!",
          "I'm analyzing the latest college updates. Please be more specific about whether you're looking for exam schedules, placement news, or upcoming campus events."
        ];
        const randomResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        res.json({ reply: randomResponse });
      }
    }

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "Server error, please try again later" });
  }
});

module.exports = router;
