const { GraphQLServer } = require("graphql-yoga");
const database = require("./connectDatabase");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

// Create GraphQL Yoga Server
module.exports = function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Query,
      Mutation
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, database })
  });
};
