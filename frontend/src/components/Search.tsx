import React, { useState } from "react";
import { Form, List, Input, Button, Avatar, message } from "antd";
import { ApolloConsumer } from "react-apollo";
import { startCase } from "lodash";

import { SEARCH_ARTISTS_QUERY, ISearchArtistsQuery } from "../graphql/search";
import { IArtist } from "../interfaces";

interface IProps {
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
}

const Search: React.FunctionComponent<IProps> = ({ seeds, setSeeds }) => {
  const [searchData, setSearchData] = useState();

  return (
    <React.Fragment>
      <Form>
        <Form.Item>
          <ApolloConsumer>
            {client => (
              <Input.Search
                onChange={async e => {
                  if (!e.target.value) return setSearchData(null);
                  const {
                    data
                  }: { data: ISearchArtistsQuery } = await client.query({
                    query: SEARCH_ARTISTS_QUERY,
                    variables: { query: e.target.value, limit: 5 }
                  });
                  setSearchData(data);
                }}
                placeholder="Search artists"
              />
            )}
          </ApolloConsumer>
        </Form.Item>
      </Form>

      {searchData && (
        <List>
          {searchData.search.artists.items.map(
            ({ id, name, images, type, genres }: IArtist) => (
              <List.Item key={id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size="large"
                      src={images[0] ? images[0].url : ""}
                    >
                      {!images[0] && name.split("")[0]}
                    </Avatar>
                  }
                  title={name}
                  description={
                    genres.length > 0
                      ? genres
                          .slice(0, 3)
                          .map(genre => startCase(genre))
                          .join(", ")
                      : "No genres available for this artist"
                  }
                />
                <Button
                  onClick={() => {
                    if (seeds.length === 5)
                      return message.warning(
                        "Maximum of 5 seeds is allowed. Please remove seeds before adding more."
                      );

                    if (seeds.map(({ id: seedId }) => seedId).includes(id))
                      return message.warning(
                        `${name} has already been added as a seed. Please select a different seed.`
                      );

                    setSeeds([...seeds, { id, name, images, genres, type }]);
                  }}
                  icon="plus"
                />
              </List.Item>
            )
          )}
        </List>
      )}
    </React.Fragment>
  );
};

export default Search;
