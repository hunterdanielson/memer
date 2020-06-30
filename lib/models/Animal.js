const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  appendages: {
    type: Number
  }
});

module.exports = mongoose.model('Animal', animalSchema);
