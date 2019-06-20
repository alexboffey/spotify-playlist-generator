import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";
import { Form, Input, List, Avatar, Button, Row, Col } from "antd";
import { startCase } from "lodash";

import Header from "./Header";
import { SEARCH_ARTISTS_QUERY, ISearchArtistsQuery } from "../graphql/search";

interface IArtistSeed {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  type: string;
  genres: Array<string>;
}

const Seeds: React.FunctionComponent = () => {
  const [searchData, setSearchData] = useState();
  const [seeds, setSeeds] = useState<Array<IArtistSeed>>([]);

  return (
    <React.Fragment>
      <Header title="Seeds" />

      <Row gutter={24}>
        <Col span={12}>
          <header>
            <p>Add seeds</p>
          </header>
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
                ({ id, name, images, type, genres }: IArtistSeed) => (
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
                          ? genres.map(genre => startCase(genre)).join(", ")
                          : "No genres available for this artist"
                      }
                    />
                    <Button
                      onClick={() => {
                        setSeeds([
                          ...seeds,
                          { id, name, images, genres, type }
                        ]);
                      }}
                      icon="plus"
                    />
                  </List.Item>
                )
              )}
            </List>
          )}
        </Col>
        <Col span={12}>
          <header>
            <p>Seeds</p>
          </header>

          {seeds.length > 0 ? (
            <List>
              {seeds.map(({ id, name, genres, images, type }) => (
                <List.Item key={id}>
                  <List.Item.Meta
                    title={name}
                    description={genres
                      .map(genre => startCase(genre))
                      .join(", ")}
                    avatar={
                      <Avatar
                        shape="square"
                        size="large"
                        src={images[0] ? images[0].url : ""}
                      >
                        {!images[0] && name.split("")[0]}
                      </Avatar>
                    }
                  />
                  <Button
                    icon="minus"
                    onClick={() => {
                      setSeeds(
                        seeds.filter(
                          ({ id: idFromSeeds }) => idFromSeeds !== id
                        )
                      );
                    }}
                  />
                </List.Item>
              ))}
            </List>
          ) : (
            <p>No seeeds added</p>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Seeds;
