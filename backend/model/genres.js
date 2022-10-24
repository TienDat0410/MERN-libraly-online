const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true,
      },
});

const Genres = mongoose.model('genres', genresSchema);

module.exports = Genres;