const express = require('express');
const { getBooks, addBook, updateBook, deleteBook, borrowBook, returnBook } = require('../controllers/bookController');
const router = express.Router();

router.route('/')
    .get(getBooks)
    .post(addBook);

router.route('/:id')
    .put(updateBook)
    .delete(deleteBook);

router.route('/:id/borrow').post(borrowBook);
router.route('/:id/return').post(returnBook);

module.exports = router;
