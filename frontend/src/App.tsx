import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import apollo from "./lib/createApolloClient";
import "./App.css";

const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      spotifyId
    }
  }
`;

const MY_TOP_TRACKS_QUERY = gql`
  query {
    myTopTracks {
      items {
        name
        id
        href
      }
      next
      previous
      total
      limit
      href
    }
  }
`;

const App: React.FC = () => {
  return (
    <ApolloProvider client={apollo}>
      <div className="App">
        <Query query={USER_QUERY}>
          {({ loading, data }: { loading: boolean; data: any }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <React.Fragment>
                <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
              </React.Fragment>
            );
          }}
        </Query>

        <Query query={MY_TOP_TRACKS_QUERY}>
          {({ loading, data }: { loading: boolean; data: any }) => {
            if (loading) return <p>Loading...</p>;

            return (
              <React.Fragment>
                <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
              </React.Fragment>
            );
          }}
        </Query>

        <a href="/auth/spotify">Log In with Spotify</a>
        <a href="/auth/logout">Log Out</a>
      </div>
    </ApolloProvider>
  );
};

export default App;
