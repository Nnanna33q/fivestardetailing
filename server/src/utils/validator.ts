import { body } from "express-validator"

export const validateContactForm = [
    body('firstName').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 1, max: 50 }).withMessage('Please enter a valid name (1 - 50 characters)'),
    body('lastName').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 1, max: 50 }).withMessage('Please enter a valid name (1 - 50 characters)'),
    body('phoneNumber').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),
    body('email').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 5, max: 254 }).withMessage('Please enter a valid email address').isEmail().withMessage('Please enter a valid email address'),
    body('message').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 10 }).withMessage('Message is too short (minimum 10 characters)').isLength({ max: 4000 }).withMessage('Message is too long (Maximum 4000 characters)')
]

export const validateBookAppointmentForm = [
    body('fullName').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 1, max: 50 }).withMessage('Please enter a valid name (1 - 50 characters)'),
    body('phoneNumber').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 7, max: 20 }).withMessage('Please enter a valid phone number'),
    body('vehicle').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 3 }).withMessage('Please enter a valid vehicle').isLength({ max: 50 }).withMessage('That’s a bit much. Please shorten your vehicle description'),
    body('email').trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 5, max: 254 }).withMessage('Please enter a valid email address').isEmail().withMessage('Please enter a valid email address'),
    body('date'),
    body('additionalNotes').optional().trim().isString().notEmpty().withMessage('Please fill this field').isLength({ min: 10 }).withMessage('Message is too short (minimum 10 characters)').isLength({ max: 4000 }).withMessage('Message is too long (Maximum 4000 characters)')
]