const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const Genre = require('../models/genre');
const Book = require('../models/book');

// Get all genres
router.get('/', genreController.showAllGenres);

// Create a new genre
router.post('/', async (req, res) => {
    try {
        const genre = new Genre({ genreName: req.body.genreName });
        await genre.save();
        res.status(201).json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all books by genreId
router.get('/book', async (req, res) => {
    try {
        const genreId = req.query.genreId;
        console.log('GET /api/genres/book?genreId=', genreId); // ✅ Log inside the route

        if (!genreId) {
            return res.status(400).json({ message: 'Missing genreId query parameter' });
        }

        const books = await Book.find({ genreId }).populate('genreId');
        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
