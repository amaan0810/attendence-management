// Routes for admin-specific actions
const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/restrict-user", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const { userId, isActive } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { isActive });
    res.json({ message: "User access updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/reactivate-user", authMiddleware, async (req, res) => {
  const { userId } = req.body;

  // Ensure the user making the request is an admin
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "User is already active." });
    }

    user.isActive = true; // Set the user's status to active
    await user.save();

    res.status(200).json({ message: "User successfully reactivated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to reactivate user." });
  }
});

module.exports = router;
