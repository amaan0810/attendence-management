
// Routes for student-specific actions
const express = require('express');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/mark-attendance', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Student') return res.status(403).json({ message: 'Forbidden' });

    const { selfieUrl } = req.body;
    try {
        const attendance = new Attendance({ userId: req.user._id, selfieUrl });
        await attendance.save();
        res.status(201).json({ message: 'Attendance marked' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/history', authMiddleware, async (req, res) => {
    if (req.user.role !== 'Student') return res.status(403).json({ message: 'Forbidden' });

    try {
        const history = await Attendance.find({ userId: req.user._id }).sort({ timestamp: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
        