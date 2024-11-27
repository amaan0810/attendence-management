
// User schema definition
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Student', 'Teacher', 'Admin'] },
    isActive: { type: Boolean, default: true },
});
module.exports = mongoose.model('User', userSchema);
        