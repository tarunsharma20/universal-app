const path          = require('path');
const fs            = require('fs');
const ApolloServer  = require('apollo-server-express').ApolloServer;

const CONFIG        = require('../../config');
const movieResolver = require('./movies').resolvers;

const typeDefs = fs.readFileSync(path.resolve(__dirname, './schema.gql'), { encoding: 'utf-8'});

const Query = Object.assign(
  {},
  movieResolver.Query
);

const Mutation = Object.assign(
  {},
  movieResolver.Mutation
);

const resolvers = {
  Query,
  Mutation
};

// API Server
const APIServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `${CONFIG.API_ENDPOINT}`,
    settings: {
      'editor.theme': 'dark',
      'editor.cursorShape': 'line'
    }
  },
});

module.exports = APIServer;
