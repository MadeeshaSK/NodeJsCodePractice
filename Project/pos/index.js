const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const ProductRoute = require('./route/ProductRoute');
const PaymentRoute = require('./route/PaymentRoute');
const OrderRoute = require('./route/OrderRoute');
const CustomerRoute = require('./route/CustomerRoute');
const UserRoute = require('./route/UserRoute');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/pos_db').then(() => {
  console.log('connected to database');
}).catch((err) => {
  console.log('error connecting to database', err);
});

app.use('/api/v1/products', ProductRoute); // http(s)://domain OR localhost:port OR 127.0.0.1:port/api/v1/products/
app.use('/api/v1/payments', PaymentRoute);
app.use('/api/v1/orders', OrderRoute);
app.use('/api/v1/customers', CustomerRoute);
app.use('/api/v1/users', UserRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});