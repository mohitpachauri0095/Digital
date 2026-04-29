require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatRoutes = require("./routes/chatRoutes");
const contactRoutes = require("./routes/contactRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/digital-notice-board")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error: ", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/events", eventRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Digital Notice Board API is running.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
