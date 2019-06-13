// Connect to remote prisma DB giving us the ability to query it in JS
const { Prisma } = require("prisma-binding");

module.exports = new Prisma({
  typeDefs: "generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});
