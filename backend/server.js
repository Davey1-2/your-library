const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const genreRoutes = require('./routes/genres');

const app = express();

mongoose.connect('mongodb://localhost:27017/booksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/books', bookRoutes);
app.use('/api/genres', genreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));