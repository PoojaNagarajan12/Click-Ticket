const express = require('express');
const User = require('../models/userModel');

const userRouter = express.Router();
userRouter.post('/register', async (req, res) => {
    try{
        const userExits = await User.findOne({ email: req.body.email });
        if(userExits) {
            return res.send({success: false, message: 'User already exists'});
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.send({success: true, message: 'Registration successful, Please Login'});
        
    }catch(error) {
            return res.status(400).json({message: error.message});
        }
        
    });

    userRouter.post('/login', async (req, res) => {
        try {
            const user = await User.findOne({ email:req.body.email })
            if(!user) {
                return res.send({success: false, message: 'User not found, Please register'})
            }

            if(user.password !== req.body.password) {
                return res.send({success: false, message: 'Invalid password'})
            }
            res.send({success: true, message: 'Login successful'})
            
        } catch (error) {
            return res.status(400).json({message: error.message});
        }});

    module.exports = userRouter;
