import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";
import apollo from "./lib/createApolloClient";
import "antd/dist/antd.min.css";
import Layout from "./components/Layout";

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

interface UserQueryData {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
  };
}

const MY_TOP_TRACKS_QUERY = gql`
  query {
    myTopTracks(limit: 5, time_range: short_term) {
      items {
        name
        id
        href
        album {
          name
        }
      }
      next
      previous
      total
      limit
      href
    }
  }
`;

interface MyTopTracksData {
  myTopTracks: {
    items: Array<{ name: string; id: string; href: string }>;
    next: string;
    previous: string;
    total: number;
    limit: number;
    href: string;
  };
}

const App: React.FC = () => {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Query<UserQueryData> query={USER_QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              return (
                <pre>
                  <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
              );
            }

            return (
              <React.Fragment>
                <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
              </React.Fragment>
            );
          }}
        </Query>

        <Query<MyTopTracksData> query={MY_TOP_TRACKS_QUERY}>
          {({ loading, data, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              return (
                <pre>
                  <code>{JSON.stringify(error, null, 2)}</code>
                </pre>
              );
            }

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
      </Layout>
    </ApolloProvider>
  );
};

export default App;
