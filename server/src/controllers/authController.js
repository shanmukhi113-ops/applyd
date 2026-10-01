const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const { name, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({ error: 'Email already in use'});
    }

    const passwordHash = bcrypt.hash(password, 10);
    const user = User.create({name, email, passwordHash});

    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.status(201).json({ token, user: {id: user._id, name: user.name, email: user.email }});
}

const login = async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser){
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const stat = await bcrypt.compare(password, existingUser.passwordHash)
    if (!stat){
        return res.status(401).json({error: 'Invalid credentials'});
    }

    const token = jwt.sign({userId : existingUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.status(200).json({ token, user: {id: existingUser._id, name: existingUser.name, email: existingUser.email }});
}


module.exports = { signup, login };

