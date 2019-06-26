import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { endpoint, prodEndpoint } from "../config";

export default new ApolloClient({
  link: createHttpLink({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});
