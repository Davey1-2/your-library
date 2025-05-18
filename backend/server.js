const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const genreRoutes = require('./routes/genres');


const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas:', err);
    });


app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/books', bookRoutes);
app.use('/api/genres', genreRoutes);

const PORT = process.env.PORT || 5000;