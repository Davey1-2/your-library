const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const Genre = require('../models/genre');

// GET all genres (uses controller)
router.get('/', genreController.showAllGenres);

// POST a new genre (simple inline)
router.post('/', async (req, res) => {
    const genre = new Genre({ genreName: req.body.genreName });
    await genre.save();
    res.status(201).json(genre);
});

module.exports = router;
