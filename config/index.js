require('dotenv').config();

const dev   = require('./config.dev');
const test  = require('./config.test');
const prod  = require('./config.dev');

const env = process.env.NODE_ENV;

const config = function (env) {
  switch(env) {
    case 'development':
      return dev;
    case 'testing':
      return test;
    case 'production':
      return prod;
    default:
      return {};
  }
};

module.exports = config(env);