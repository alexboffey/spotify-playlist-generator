import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import { message } from "antd";
import "antd/dist/antd.less";

import "./style/style.css";
import apollo from "./lib/createApolloClient";
import { USER_QUERY, IUserQuery } from "./graphql/userQuery";
import Login from "./components/Login";
import LoadingScreen from "./components/LoadingScreen";
import Wrapper from "./components/Wrapper";

export const App: React.FunctionComponent = () => {
  return (
    <Query<IUserQuery> query={USER_QUERY}>
      {({ loading, data, error }) => {
        if (loading) return <LoadingScreen />;
        if (error) return message.error(error);
        if (data && !data.me) return <Login />;
        if (data && data.me) return <Wrapper me={data.me} />;
      }}
    </Query>
  );
};

export default () => (
  <ApolloProvider client={apollo}>
    <App />
  </ApolloProvider>
);
