const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animal');
const seed = require('../lib/utils/seed');
const { prepare } = require('../lib/utils/prepare');

describe('animals routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  beforeEach(() => {
    return seed();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('will create an animal via POST', () => {
    return request(app)
      .post('/api/v1/animals')
      .send({
        name: 'cat',
        image: 'cat.png',
        appendages: '4'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'cat',
          image: 'cat.png',
          appendages: '4',
          _id: expect.anything(),
          __v: 0
        });
      });
  });

});
