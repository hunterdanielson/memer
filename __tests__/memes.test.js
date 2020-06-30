const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

describe('memer routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('will create a meme via POST', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'topper',
        image: 'pic.png',
        bottom: 'bottomeme'
      })
      .then(res => {
        expect(res.body).toEqual({
          top: 'topper',
          image: 'pic.png',
          bottom: 'bottomeme',
          _id: expect.anything(),
          __v: 0
        });
      });
  });
});
