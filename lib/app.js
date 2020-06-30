const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// only need to seed once
// this just makes it so it seeds every time you run start
// will leave here incase need to seed again and for TA's
const seed = require('./utils/seed');
seed();

app.use('/api/v1/memes', require('./routes/memes'));
app.use('/api/v1/animals', require('./routes/animals'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
