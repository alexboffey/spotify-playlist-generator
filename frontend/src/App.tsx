import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import "antd/dist/antd.min.css";

import apollo from "./lib/createApolloClient";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { USER_QUERY, IUserQuery } from "./graphql/userQuery";
import { message } from "antd";

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={apollo}>
      <Query<IUserQuery> query={USER_QUERY}>
        {({ loading, data, error }) => {
          if (loading) return null;
          if (error) return message.error(error);
          if (data && !data.me) return <Login />;
          if (data && data.me) {
            return (
              <Layout me={data.me}>
                <p>Something meaningful...</p>
              </Layout>
            );
          }
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
