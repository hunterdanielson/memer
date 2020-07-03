const chance = require('chance').Chance();
const Meme = require('../models/Meme');
const Animal = require('../models/Animal');
const Game = require('../models/Game');

module.exports = async({ memes = 30, animals = 30, games = 50 } = {}) => {
  await Meme.create([...Array(memes)].map(() => ({
    top: chance.word(),
    image: chance.url({ extensions: ['gif', 'jpg', 'png'] }),
    bottom: chance.word()
  })));

  await Animal.create([...Array(animals)].map(() => ({
    name: chance.animal(),
    image: chance.url({ extensions: ['gif', 'jpg', 'png'] }),
    appendages: chance.natural({ min: 0, max: 8 })
  })));

  await Game.create([...Array(games)].map(() => ({
    title: chance.word(),
    image: chance.url({ extensions: ['gif', 'jpg', 'png'] }),
    releaseDate: chance.date(),
    price: chance.dollar({ max: 80 })
  })));
};
