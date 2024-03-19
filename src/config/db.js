const { connect } = require('mongoose');
const mongoose = require('mongoose');

// Set the strictQuery option
mongoose.set('strictQuery', false); // Or true depending on your preference

const {
  db: { mongoUri, useNewUrlParser, useUnifiedTopology },
} = require('.');

const database = {
  authenticate: () =>
    connect(mongoUri, {
      useNewUrlParser,
      useUnifiedTopology,
    }),
};

module.exports = { database };
