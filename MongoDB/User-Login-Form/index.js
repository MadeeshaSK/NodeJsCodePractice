const userSchema = require('./User');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI) 
.then (() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error: ', err);
});

app.post('/signup', async (req, res) => {
    
    const { name, email, password } = req.body;
        const selectedUser = await userSchema.findOne({
            email: email
        });
        if (selectedUser) {
            return res.status(409).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = new userSchema({
            name: name,
            email: email,
            password: hashedPassword
        });
        try {
            await createdUser.save();
            return res.status(201).json({ message: 'User Registered' });
        } catch (err) {
            res.status(500).json({ message: err });
        }        
    
});

app.post('/login', async (req, res) => {
    
    const {email, password } = req.body;
        const selectedUser = await userSchema.findOne({
            email: email
        });
        if (!selectedUser) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, selectedUser.password);
        if (!isMatch) {
            return res.status(403).send('Password is wrong');
        }
        const token = jwt.sign(
            { email: selectedUser.email, name:selectedUser.name, id:selectedUser._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ message: 'User logged in', token: token });       
    
});

app.listen(process.env.PORT, () => {    
    console.log('Server is running');
});  