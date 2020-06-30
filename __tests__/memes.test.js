const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Meme = require('../lib/models/Meme');
const seed = require('../lib/utils/seed');
const { prepare } = require('../lib/utils/prepare');

describe('memer routes', () => {
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

  it('will get all memes via GET', async() => {
    const allMemes = prepare(await Meme.find());
    return request(app)
      .get('/api/v1/memes')
      .then(res => expect(res.body).toEqual(allMemes));
  });

  it('will get a meme by id via GET', async() => {
    const meme = prepare(await Meme.findOne());
    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => expect(res.body).toEqual(meme));
  });
});
