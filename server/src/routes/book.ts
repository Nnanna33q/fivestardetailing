import express from 'express';

const BookRouter = express.Router();

BookRouter.post('/book');

export default BookRouter;