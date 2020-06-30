const chance = require('chance').Chance();
const Meme = require('../models/Meme');

module.exports = async({ memes = 30 } = {}) => {
  await Meme.create([...Array(memes)].map(() => ({
    top: chance.word(),
    image: chance.url({ extensions: ['gif', 'jpg', 'png'] }),
    bottom: chance.word()
  })));
};
