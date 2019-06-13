import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

export default new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
});
