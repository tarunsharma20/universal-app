const port     = process.env.PROD_APP_PORT  || 8080;
const hostname = process.env.PROD_HOST_NAME || '127.0.0.1';

const dbHostname = process.env.PROD_DB_HOST_NAME || '127.0.0.1';
const dbPort     = process.env.PROD_DB_PORT      || 27017;
const dbName     = process.env.PROD_DB_NAME      || '';

const tokenExpiresIn  = process.env.PROD_TOKEN_EXPIRES_IN  || 60;
const tokenPrivateKey = process.env.PROD_TOKEN_PRIVATE_KEY || 'sd%sdr!gh%';
const endPoint        = process.env.PROD_API_ENDPOINT      || `http://${hostname}:${port}/api/`;

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
