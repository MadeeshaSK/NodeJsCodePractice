const express = require('express');
const router = express.Router();
const customerController = require('./customerController');

router.post('/create', customerController.CreateCustomer);
router.get('/find-all', customerController.FindAllCustomers);
router.get('/find-by-id/:id', customerController.FindCustomerById);
router.put('/update/:id', customerController.UpdateCustomerById);
router.delete('/delete/:id', customerController.DeleteCustomerById);

module.exports = router;