const Book = require('../models/book');

//create a new book
exports.createBook = async (req, res) => {
    try {
        const book = new Book({
            bookName: req.body.bookName,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            genreId: req.body.genreId,
            readCheck: req.body.readCheck
        });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//update a book
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            {
                bookName: req.body.bookName,
                author: req.body.author,
                releaseDate: req.body.releaseDate,
                genreId: req.body.genreId,
                readCheck: req.body.readCheck
            },
            { new: true }
        );
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//delete a book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//filter books by parameters
exports.filterBooks = async (req, res) => {
    try {
        const query = {};

        if (req.query.author) {
            query.author = req.query.author;
        }

        if (req.query.genreId) {
            query.genreId = req.query.genreId;
        }

        if (req.query.readCheck !== undefined) {
            query.readCheck = req.query.readCheck === 'true';
        }

        const books = await Book.find(query);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
