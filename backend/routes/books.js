const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const booksController = require('../controllers/booksController');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('genreId');
        res.json(books); // ✅ This line must exist
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/', booksController.getAllBooks);
router.get('/filter', booksController.filterBooks);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
console.log("Books route called");
