const port     = process.env.TEST_APP_PORT  || 7000;
const hostname = process.env.TEST_HOST_NAME || '127.0.0.1';

const dbHostname = process.env.TEST_DB_HOST_NAME || '127.0.0.1';
const dbPort     = process.env.TEST_DB_PORT      || 27017;
const dbName     = process.env.TEST_DB_NAME      || '';

const tokenExpiresIn  = process.env.TEST_TOKEN_EXPIRES_IN  || 60;
const tokenPrivateKey = process.env.TEST_TOKEN_PRIVATE_KEY || 'fg&%hfdm@';
const endPoint        = process.env.TEST_API_ENDPOINT      || `http://${hostname}:${port}/api/`;

module.exports = {
  APP: {
    PORT     : port,
    HOSTNAME : hostname
  },
  DB: {
    HOSTNAME : dbHostname,
    PORT     : dbPort,
    NAME     : dbName
  },
  TOKEN: {
    EXPIRES_IN  : tokenExpiresIn,
    PRIVATE_KEY : tokenPrivateKey
  },
  API_ENDPOINT: endPoint
};
