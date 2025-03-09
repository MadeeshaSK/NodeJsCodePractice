const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/PaymentController');
const verifyToken = require('../middleware/Auth.js');

router.post('/create',verifyToken(['admin', 'manager']), PaymentController.makePayment);
router.get('/income-today',verifyToken(['admin', 'manager']), PaymentController.findIncomeToday);
router.get('/income-this-month',verifyToken(['admin', 'manager']), PaymentController.findIncomeByCurrentMonth);

module.exports = router;