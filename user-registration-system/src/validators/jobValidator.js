const { body, param, validationResult } = require('express-validator');

const allowedMethods = ['POST', 'PUT', 'GET', 'DELETE'];

// Validation for adding a new job
exports.addJobValidation = [
    body('startAt').notEmpty().withMessage('Start time is required').isISO8601().withMessage('Invalid date format'),
    body('endAt').optional().isISO8601().withMessage('Invalid date format'),
    body('pattern').isInt({ min: 1 }).withMessage('Pattern must be a positive integer representing milliseconds'),
    body('target').notEmpty().withMessage('Target is required').isString().withMessage('Target must be a valid string'),
    body('method').notEmpty().withMessage('Method is required').isIn(allowedMethods).withMessage('Method must be one of POST, PUT, GET, DELETE'),
];

exports.removeJobValidation = [
    param('id').isInt().withMessage('Job ID must be an integer'),
];

exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
