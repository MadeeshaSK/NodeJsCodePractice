const Customer = require('./Customer');

const CreateCustomer = async (req, res) => {

    // save customer (POST) => (data eend in the body)
    // http://localhost:3000/customers/create
    try {
        const {name, email, phone, address} = req.body;
        const customer = new Customer({
            name,
            email,
            phone,
            address
        });
        await customer.save();
        res.status(201).json({message: 'Customer created successfully', data: customer});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const FindAllCustomers = async (req, res) => {

    // find all customers (GET) => (data send in the header & params)
    // page ination is a process of dividing a document into discrete pages, either electronic pages or printed pages.
    //(searchText, page, size)
    // http://localhost:3000/customers/find-all
    try{
        const {searchText = '', page = 0, size = 10} = req.query;
        const query= searchText ? {name: {$regex: searchText, $options: 'i'}} : {};
        const customers = await Customer.find(query).skip(page * size).limit(parseInt(size));
        const count = await Customer.countDocuments(query);
        res.status(200).json({message: 'Customers found successfully', data: {customers, count}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const FindCustomerById =  async (req, res) => {

    // find customer by id (GET) => (data send in the header & params)
    // http://localhost:3000/customers/find-by-id/1002 or
    // http://localhost:3000/customers/find-by-id?id=1002
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        if(!customer){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json({message: 'Customer found successfully', data: customer});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
const UpdateCustomerById = async (req, res) => {

    // update customer by id (PUT) => (data send in the body)
    // http://localhost:3000/customers/update/1002
    try {
        const {id} = req.params;
        const {name, email, phone, address} = req.body;
        const updatedCustomer = await Customer.findById(id,{name, email, phone, address},{new: true}); // to asign updated record {new: true}
        if(!updatedCustomer){   
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json({message: 'Customer updated successfully', data: updatedCustomer});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};
const DeleteCustomerById = async (req, res) => {

    // delete customer by id (DELETE) => (data send in the header & params)
    // http://localhost:3000/customers/delete/1002
    try {
        const {id} = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if(!deletedCustomer){
            return res.status(404).json({message: 'Customer not found'});
        }
        res.status(200).json({message: 'Customer deleted successfully', data: deletedCustomer});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// export the module
module.exports = {
    CreateCustomer,
    FindAllCustomers,
    FindCustomerById,
    UpdateCustomerById,
    DeleteCustomerById
};