import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { endpoint, prodEndpoint } from "../config";

export default new ApolloClient({
  link: new HttpLink({
    uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
    credentials: "include"
  }),
  cache: new InMemoryCache()
});
