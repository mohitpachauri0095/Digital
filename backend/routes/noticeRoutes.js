const express = require('express');
const router = express.Router();
const multer = require('multer');
const Notice = require('../models/Notice');
const authMiddleware = require('../middleware/authMiddleware');
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// GET all notices (Public)
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single notice by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new notice (Admin only)
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let fileUrl = '';
    
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    // AI Categorization and Summarization
    let aiSummary = "No summary available.";
    let category = "General";

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_api_key_here") {
      try {
        const prompt = `You are an AI assistant for a college digital notice board.
Title: ${title}
Content: ${content}

Task 1: Summarize the content in 1-2 concise sentences.
Task 2: Categorize it exactly into ONE of these categories: Exam, Placement, Event, General.

Response Format exactly like this without extra words:
CATEGORY: [Category Name]
SUMMARY: [Your summary]`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });
        const aiResponseText = response.text || "";
        
        const catMatch = aiResponseText.match(/CATEGORY:\s*(.*)/i);
        const sumMatch = aiResponseText.match(/SUMMARY:\s*(.*)/i);
        
        if (catMatch && catMatch[1]) category = catMatch[1].trim();
        if (sumMatch && sumMatch[1]) aiSummary = sumMatch[1].trim();

        // Validate category
        if (!['Exam', 'Placement', 'Event', 'General'].includes(category)) {
          category = "General";
        }
      } catch (aiError) {
        console.error("AI Generation Error:", aiError);
      }
    }

    const newNotice = new Notice({
      title,
      content,
      category,
      fileUrl,
      aiSummary
    });

    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a notice (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ error: "Notice not found" });
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
