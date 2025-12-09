import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ContactRouter from './routes/contact.js';

const app = express();

app.use(cors({ origin: (origin, callback) => {
    if(origin === 'https://fivestardetailing.vercel.app' || origin === 'http://127.0.0.1:5500') {
        callback(null, true);
    } else callback(new Error('Not allowed by CORS'));
}}))

app.use(express.json());

app.use(ContactRouter) // Handles Contact Submissions

app.listen(process.env.PORT || 3000, () => console.log(`App is listening on PORT ${process.env.PORT}`))