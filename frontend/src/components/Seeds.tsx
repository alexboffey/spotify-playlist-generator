import React from "react";
import { Query } from "react-apollo";

import Header from "./Header";
import { SEARCH_ARTISTS_QUERY, ISearchQuery } from "../graphql/search";

const Seeds: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header title="Seeds" />

      <Query<ISearchQuery>
        query={SEARCH_ARTISTS_QUERY}
        variables={{ query: "Chris", limit: 10 }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error)
            return (
              <pre>
                <code>{JSON.stringify(error, null, 2)}</code>
              </pre>
            );
          if (data) {
            return (
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            );
          }
        }}
      </Query>
    </React.Fragment>
  );
};

export default Seeds;
