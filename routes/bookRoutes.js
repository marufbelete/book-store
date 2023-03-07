import express from 'express';
import {createBook,deleteBookReviewByISBN,getAllBooks,
    getBookByAuthor,getBookByISBN,getBookByTitle,
    getBookReviewByISBN,updateBookReviewByISBN} from '../controllers/bookController.js';
import Auth from '../auth/auth.middlware.js';
const router = express.Router();
router.post('/book', createBook);
router.get('/books', getAllBooks);
router.get('/books/isbn/:isbn', getBookByISBN);
router.get('/books/author/:author', getBookByAuthor);
router.get('/books/title/:title', getBookByTitle);
router.get('/books/review/:isbn',Auth, getBookReviewByISBN);
router.put('/books/customer/auth/review/:isbn',Auth, updateBookReviewByISBN);
router.delete('/books/customer/auth/review/:isbn',Auth, deleteBookReviewByISBN);

export default router;