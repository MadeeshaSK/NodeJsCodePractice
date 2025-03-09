const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    qtyOnHand: {
        type: Number,
        required: true,
    },
    isStocked: {
        type: Boolean,
        default: true,
    },
    images: {
        type: Array, //s3 bucket
        default: true,
    }
});

ProductSchema.statics.findLowStockProducts = function () {
    return this.find({ qtyOnHand: { $lt: 10 } });
}

module.exports = mongoose.model('Product', ProductSchema);