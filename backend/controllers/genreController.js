const Genre = require('../models/genre');

// Show all genres
exports.showAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new genre
exports.createGenre = async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    });

    try {
        const newGenre = await genre.save();
        res.status(201).json(newGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single genre by ID
exports.getGenre = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a genre by ID
exports.deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json({ message: 'Genre deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
