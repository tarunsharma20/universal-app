const port     = process.env.DEV_APP_PORT  || 3002;
const hostname = process.env.DEV_HOST_NAME || '127.0.0.1';

const dbHostname = process.env.DEV_DB_HOST_NAME || '127.0.0.1';
const dbPort     = process.env.DEV_DB_PORT      || 27017;
const dbName     = process.env.DEV_DB_NAME      || '';

const tokenExpiresIn  = process.env.DEV_TOKEN_EXPIRES_IN  || 60;
const tokenPrivateKey = process.env.DEV_TOKEN_PRIVATE_KEY || 'g%4kd4h*&mnr';
const endPoint        = process.env.DEV_API_ENDPOINT      || `http://${hostname}:${port}/api/`;

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
