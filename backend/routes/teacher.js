// Routes for teacher-specific actions
const express = require("express");
const Attendance = require("../models/Attendance");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get("/students", authMiddleware, async (req, res) => {
  if (req.user.role !== "Teacher")
    return res.status(403).json({ message: "Forbidden" });

  try {
    const students = await User.find({ role: "Student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/attendance", authMiddleware, async (req, res) => {
  if (req.user.role !== "Teacher")
    return res.status(403).json({ message: "Forbidden" });

  try {
    const attendance = await Attendance.find().populate("userId", "name");
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
