import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import apollo from "./lib/createApolloClient";
import "./App.css";

const USERS_QUERY = gql`
  query {
    me {
      id
      name
      email
      permissions
    }
  }
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={apollo}>
      <div className="App">
        <Query query={USERS_QUERY}>
          {({ loading, data }: { loading: boolean; data: any }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            );
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
};

export default App;
