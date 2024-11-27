
// Attendance schema definition
const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    selfieUrl: String,
});
module.exports = mongoose.model('Attendance', attendanceSchema);
        