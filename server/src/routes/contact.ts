import express from 'express';
import checkErrors from '../utils/check-errors.js';
import { validateContactForm } from '../utils/validator.js';
import type { NextFunction, Request, Response } from 'express';

const ContactRouter = express.Router();

ContactRouter.post('/contact', validateContactForm, checkErrors, (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
    })
})

export default ContactRouter;