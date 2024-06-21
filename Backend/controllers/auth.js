const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { mailerSend, emailDetails, setEmailParams } = require('../config/mailConfig');
const { validationResult } = require('express-validator');
const { welcomeHTML } = require('../config/welcomeHTML');
const { createResetPasswordEmail } = require('../config/passwordReset');

exports.postSignup = async (req, res, next) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()[0].msg,
        });
    }
    try {
        const user = await User.findOne({ email: email });
        if(user) {
            return res.status(409).json({
                message: 'Email already exists.'
            });
        }
        const hashedPassword =await bcrypt.hash(password, 12);
        if(!hashedPassword) {
            return res.status(500).json({
                message: 'An error occurred.'
            });
        }
        const newUser = new User({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
        });
        await newUser.save();
        emailDetails("UserName", email);
        const subject = 'Welcome to our blog!';
        const html = welcomeHTML;
        const text = 'Welcome to our blog!';
        const emailParams = setEmailParams(subject, html, text);
        await mailerSend.email.send(emailParams);
        res.status(201).json({
            message: 'User created successfully!',
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()[0].msg,
        });
    }
    try {
        const user = await User.findOne({ email: email });
        if(!user) {
            return res.status(404).json({
                message: 'Email not found.'
            });
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            return res.status(401).json({
                message: 'Incorrect password.'
            });
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Logged in successfully!',
            userName: user.first_name,
            expiresIn: 3600,
            userID: user._id.toString(),
            token: token,
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.postForgotPassword = async (req, res, next) => {
    const email = req.body.email;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()[0].msg,
        });
    }
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).json({
                message: 'Email not found.'
            });
        }
        emailDetails("UserName", email);
        const subject = 'Password Reset';
        const html = createResetPasswordEmail(user.first_name, user._id.toString());
        const text = 'Password Reset';
        const emailParams = setEmailParams(subject, html, text);
        await mailerSend.email.send(emailParams);
        res.status(200).json({
            message: 'Password reset email sent.'
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
};

exports.postResetPassword = async (req, res, next) => {
    const password = req.body.password;
    const userID = req.body.userID;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed.',
            errors: errors.array()[0].msg,
        });
    }
    try {
        const user = await User.findById(userID);
        if(!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        if(!hashedPassword) {
            return res.status(500).json({
                message: 'An error occurred.'
            });
        }
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            message: 'Password reset successfully.'
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'An error occurred.'
        });
    }
}