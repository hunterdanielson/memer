const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  releaseDate: {
    type: Date
  },
  price: {
    type: String
  }
});

module.exports = mongoose.model('Game', gameSchema);
