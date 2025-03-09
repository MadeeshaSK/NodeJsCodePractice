const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema');
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
        const { userName, password, fullName, role } = req.body;
        const userExists = await User.findOne({userName});
        if (userExists) {
           return res.status(400).json({message: 'User already exists', data : null});
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hash(password, salt);
            const createUser = new User({
                userName,
                password: hashedPassword,
                fullName,
                role,
                isActive: true
            });
            await createdUser.save();
            res.status(201).json({message: 'User created successfully', data: null});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
}

const login = async (req, res) => {
    const { userName, password } = req.body;
    const userExists = await User.findOne({userName});
    if (!userExists) {
        return res.status(404).json({message: 'not found', data: null});
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
        return res.status(403).json({message: 'wrong password', data: null});
    }
    const payload = {
        userId: userExists._id,
        userName: userExists.userName,
        role: userExists.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
    return res.status(200).json({message: 'login successful', data: {token: token}});
}
module.exports = {
    signup,
    login
};