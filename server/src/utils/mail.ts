import nodemailer from 'nodemailer';
import type { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const host = 'smtp.mailersend.net';
const port = 2525

export default async function sendMail(req: Request, res: Response, next: NextFunction) {
    try {
        const { firstName, lastName, phoneNumber, email, message } = req.body;
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user: process.env.MAILERSEND_USERNAME,
                pass: process.env.MAILERSEND_PASSWORD
            }
        })
        await transporter.sendMail({
            from: `Five Star Detailing <${process.env.MAILERSEND_USERNAME}>`,
            to: process.env.OWNER_EMAIL_ADDRESS,
            subject: 'New Contact Form Submission',
            text: `Someone has reached out through your contact form\n\n\nFirst Name: ${firstName}\n\nLast Name: ${lastName}\n\nPhone Number: ${phoneNumber}\n\nEmail: ${email}\n\nMessage: ${message}`
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: error instanceof Error ? error.message : 'An unexpected error occurred',
            errorField: ''
        })
    }
}