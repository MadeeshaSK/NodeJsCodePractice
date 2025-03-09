const Customer = require('../model/CustomerSchema');

const saveCustomer = async (req, res) => { // admin / manager Only
    try {
        const createdCustomer = new Customer(req.body);
        const savedCustomer = await createdCustomer.save();
        res.status(201).json({message:"Customer Saved!", data: savedCustomer});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCustomer = async (req, res) => { // admin / manager Only
    try {
        const updatedCutomer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updateCustomer) {
            return res.status(201).json({message:"Customer Updated!", data: updatedCutomer });
        } else {        
            res.status(404).json({ message: 'Customer not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCustomer = async (req, res) => { // admin / manager Only
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (deletedCustomer) {
            return res.status(200).json({message:"Customer Deleted!", data: deletedCustomer });
        } else {
            res.status(404).json({ message: 'Customer not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findCustomer = async (req, res) => { // admin / manager / user
    try {
        const customer = await Customer.findById(req.params.id);
        if (customer) {
            return res.status(200).json({message :"Customer Found!", data: customer });
        } else {
            res.status(404).json({ message: 'Customer not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loadAllCustomers = async (req, res) => { // admin / manager / user
    try {
        const {searchText, page = 1, size = 10} = req.query;
        const filter = searchText ? {$or:[
            {customerName: {$regex: searchText, $options: "i"}},
            {address: {$regex: searchText, $options: "i"}},
            {email: {$regex: searchText, $options: "i"}}
        ]}: {};
        const customerList =  await Customer.find(filter).skip((page - 1) * size).limit(parseInt(size));
        const total = await Customer.countDocuments(filter);
        res.status(200).json({message:"Customer List Fetched!", data:{dataList : customerList, count: total}} );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer,
    loadAllCustomers
};