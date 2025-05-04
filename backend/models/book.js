const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    readCheck: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookSchema);