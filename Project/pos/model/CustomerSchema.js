const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);