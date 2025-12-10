import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ContactRouter from './routes/contact.js';
import PingRouter from './routes/ping.js';

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_DOMAIN : 'http://127.0.0.1:5500/'
}))

app.use(express.json());

app.use(ContactRouter) // Handles Contact Submissions

// Wakes render when user loads contact page
// It speeds up contact form submission
app.use(PingRouter)

app.listen(process.env.PORT || 3000, () => console.log(`App is listening on PORT ${process.env.PORT}`))