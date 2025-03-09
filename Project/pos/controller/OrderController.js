const Order = require('../model/OrderSchema');

const saveOrder = async (req, res) => { // admin / manager Only
    try {
        const createdOrder = new Customer(req.body);
        const savedOrder = await createdOrder.save();
        res.status(201).json({message:"Order Saved!", data: savedOrder});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => { // admin Only
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updateOrder) {
            return res.status(201).json({message:"Order Updated!", data: updatedOrder });
        } else {        
            res.status(404).json({ message: 'Order not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => { // admin Only 
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            return res.status(200).json({message:"Order Deleted!", data: deletedOrder });
        } else {
            res.status(404).json({ message: 'Order not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findOrder = async (req, res) => { // admin / manager 
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            return res.status(200).json({message :"Order Found!", data: order });
        } else {
            res.status(404).json({ message: 'Order not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loadAllOrders = async (req, res) => { // admin / manager
    try {
        const {page = 1, size = 10} = req.query;
        const orders = await Order.find().sort({Date:-1}).limit(size * 1).skip((page - 1) * size).exec();
        const count = await Order.countDocuments(filter);
        res.status(200).json({message:"Orders Found!", data: orders, totalPages: Math.ceil(count / size), currentPage: page});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrderStatus = async (req, res) => { // admin / manager Only
    try {
        const {id} = req.params;
        const {status} = req.body;
        if (!["Pending", "Rejected", "Completed", "Cancled"].includes(status)) {
            return res.status(400).json({ message: 'Invalid status!', data: null });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {status},
            { new: true }
        );
        if (updatedOrder) {
            return res.status(201).json({message:"Order Updated!", data: updatedOrder });
        } else {        
            res.status(404).json({ message: 'Order not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}

module.exports = {
    saveOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    loadAllOrders,
    updateOrderStatus
};