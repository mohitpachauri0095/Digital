require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const Admin = require('./models/Admin');
const Notice = require('./models/Notice');
const ChatHistory = require('./models/ChatHistory');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/digital-notice-board";

const seedDB = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected!");

    console.log("🧹 Clearing old database records...");
    await Admin.deleteMany({});
    await Notice.deleteMany({});
    await ChatHistory.deleteMany({});

    console.log("👤 Creating default Admin user...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    const newAdmin = new Admin({
      username: "admin",
      email: "admin@college.edu",
      password: hashedPassword
    });
    await newAdmin.save();
    console.log("✅ Admin user created (Username: admin | Password: admin123)");

    console.log("📢 Creating sample Notices for the dashboard...");
    const sampleNotices = [
      {
        title: "Upcoming Mid-Semester Exams",
        category: "Exam",
        content: "The End-semester examinations for all B.Tech and MCA courses will commence from May 7th. Please check the portal for your exact schedule. Admis cards will be strictly checked.",
        aiSummary: "End-Term Exams starting May 7th for B.Tech/MCA.",
      },
      {
        title: "TCS Global Tech Placement Drive",
        category: "Placement",
        content: "TCS is organizing a campus drive on Nov 25th for final year students. Minimum 7.5 CGPA required. Register before Nov 20th in the placement cell office.",
        aiSummary: "TCS Campus Placement on May 2th. Min 7.5 CGPA needed. Register by April 30th.",
        link: "https://placement.college.edu"
      },
      {
        title: "Annual Cultural Fest 'Zephyr 2026'",
        category: "Event",
        content: "Get ready for the biggest event of the year! Zephyr 2026 will be held from Dec 1 to Dec 3. Participate in music, dance, and tech competitions.",
        aiSummary: "Zephyr 2026 Cultural Fest from Dec 1 to 3 with various competitions.",
      },
      {
        title: "Library Maintenance Notice",
        category: "General",
        content: "The central library will remain closed this Saturday due to scheduled maintenance and pest control operations. Online resources are still available.",
        aiSummary: "Central library closed on Saturday for maintenance.",
      }
    ];

    await Notice.insertMany(sampleNotices);
    console.log(`✅ ${sampleNotices.length} Notices created.`);

    console.log("🎉 Database successfully seeded and created!");
    process.exit();

  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
