const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    order: {
        type: Array, // {orderId: 1, orderDate: '2021-10-10', customerName: 'John Doe'}
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    extraCharges: {
        type: Array, // [{reson: 'Delivery', amount: 100}, {reson: 'Service', amount: 50}]
        required: true,
    },
    date: {
        type: Date, 
        default: true,
    },
    transactionDetails: {
        type: Array, // [{paymentType: 'Cash', amount: 1000}, {paymentType: 'Credit', amount: 500}]
        required: true,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);