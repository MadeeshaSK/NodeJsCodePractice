const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    products: {
        type: Array, // [{productId: 1, productName: 'Product 1', qty: 2, unitPrice: 1000}, {productId: 2, productName: 'Product 2', qty: 1, unitPrice: 500}]
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    status: {
        type: String, // {status: 'Pending'}, {status: 'Rejcted'}, {status: 'Completed'}
        required: true,
    },
    customer: {
        type: Object, // {customerId: 1, customerName: 'John'}
        required: true,
    },
    date: {
        type: Date, 
        default: true,
    }
});

module.exports = mongoose.model('Order', OrderSchema);