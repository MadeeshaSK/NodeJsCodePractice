const Payment = require('../model/PaymentSchema');

const makePayment = async (req, res) => { // admin / manager Only
    try {
        const createdPayment = new Payment(req.body);
        const savedPayment = await createdPayment.save();
        res.status(201).json({message:"Payment Saved!", data: savedPayment});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findIncomeToday = async (req, res) => { // admin / manager
    try {
        const {day} = new Date(); // YYYY-MM-DD
        const startDay = new Date(day);
        const endDay = new Date(day);
        endDay.setDate(endDay.getDate() + 1);
        const data = await Payment.find({
            Date:{
                $gte: startDay, // greater than or equal to
                $lt: endDay // less than
            }
        }) ;
        const totalIncome = data.reduce((sum, payment) => sum + payment.amount, 0);
        res.status(200).json({message:"Total Income Today", data: totalIncome});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findIncomeByCurrentMonth = async (req, res) => { // admin / manager
    try {
        const now = new Date(); 
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const data = await Payment.find({
            Date:{
                $gte: startOfMonth, 
                $lt: endOfMonth 
            }
        }) ;
        const incomeByDay = data.reduce((sum, payment) => {
            const day = payment.Date.toISOString().split('T')[0]; // [date, time]
            acc[day] = (acc[day] || 0) + payment.amount;
            return acc;
        }, {});
        res.status(200).json({message:"Total Income This Month", data: {month:now.getMonth( ) + 1, income: incomeByDay}});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    makePayment,
    findIncomeToday,
    findIncomeByCurrentMonth
};