const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: Array, // {roleName: 'Admin'}, {roleName: 'User'}, {roleName: 'Manager'}
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('User', UserSchema);