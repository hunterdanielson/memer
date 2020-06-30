const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', (req, res, next) => {
    Animal
      .create(req.body)
      .then(animal => res.send(animal))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Animal
      .find(req.query)
      .then(animals => res.send(animals))
      .catch(next);
  });
  
 
