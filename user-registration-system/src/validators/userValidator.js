const { body, validationResult } = require('express-validator');

// Register User Validation Rules
exports.registerUserValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('email').isEmail().withMessage('Email is not valid'),
];

// Login User Validation Rules
exports.loginUserValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Update User Validation Rules
exports.updateUserValidation = [
    body('username').optional().notEmpty().withMessage('Username cannot be empty if provided'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive integer if provided'),
    body('email').optional().isEmail().withMessage('Email is not valid if provided'),
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
