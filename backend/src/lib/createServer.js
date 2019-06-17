const { GraphQLServer } = require("graphql-yoga");
const database = require("../services/database");
const Mutation = require("../resolvers/mutation");
const Query = require("../resolvers/query");

// Create GraphQL Yoga Server
module.exports = function() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Query
      // Mutation
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, database })
  });
};
