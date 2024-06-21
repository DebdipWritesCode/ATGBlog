const express = require('express');
const { check } = require('express-validator');
const { postSignup, postLogin, postForgotPassword, postResetPassword } = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        check('password')
            .trim()
            .isLength({ min: 5 }),
        check('first_name')
            .trim()
            .not()
            .isEmpty()
    ],
    postSignup
);

router.post(
    '/login',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        check('password')
            .trim()
            .isLength({ min: 5 }),
    ],
    postLogin
);

router.post(
    '/forgot-password',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
    ],
    postForgotPassword  
);

router.post(
    '/reset-password',
    [
        check('password')
            .trim()
            .isLength({ min: 5 }),
    ],
    postResetPassword
);

module.exports = router;