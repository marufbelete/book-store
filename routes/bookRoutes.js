const express = require('express');
const bookController = require('../controllers/bookController');
const Auth=require('../auth/auth.middlware')
const router = express.Router();
router.post('/book', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/isbn/:isbn', bookController.getBookByISBN);
router.get('/books/author/:author', bookController.getBookByAuthor);
router.get('/books/title/:title', bookController.getBookByTitle);
router.get('/books/review/:isbn', bookController.getBookReviewByISBN);
router.put('/books/customer/auth/review/:isbn',Auth, bookController.updateBookReviewByISBN);
router.delete('/books/customer/auth/review/:isbn',Auth, bookController.deleteBookReviewByISBN);



module.exports = router;