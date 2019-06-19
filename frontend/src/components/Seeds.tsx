import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";
import { Form, Input } from "antd";

import Header from "./Header";
import { SEARCH_ARTISTS_QUERY, ISearchArtistsQuery } from "../graphql/search";

const Seeds: React.FunctionComponent = () => {
  const [searchData, setSearchData] = useState();

  return (
    <React.Fragment>
      <Header title="Seeds" />

      <ApolloConsumer>
        {client => (
          <Form>
            <Form.Item label="Add artist seeds">
              <Input.Search
                onSearch={async query => {
                  if (!query) return;

                  const {
                    data
                  }: { data: ISearchArtistsQuery } = await client.query({
                    query: SEARCH_ARTISTS_QUERY,
                    variables: { query }
                  });
                  setSearchData(data);
                }}
                placeholder="Search artists"
              />
            </Form.Item>
          </Form>
        )}
      </ApolloConsumer>

      {searchData && (
        <pre>
          <code>{JSON.stringify(searchData, null, 2)}</code>
        </pre>
      )}
    </React.Fragment>
  );
};

export default Seeds;
