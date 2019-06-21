import React, { useState } from "react";
import { Modal, Form, Input, List, Avatar, Button, message } from "antd";
import { ApolloConsumer } from "react-apollo";
import { startCase } from "lodash";

import { SEARCH_ARTISTS_QUERY, ISearchArtistsQuery } from "../graphql/search";
import { IArtist } from "../interfaces";
import SeedTags from "./SeedTags";

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
  refetch: () => void;
}

const SeedsModal: React.FunctionComponent<IProps> = ({
  visible,
  setVisible,
  seeds,
  setSeeds,
  refetch
}) => {
  const [searchData, setSearchData] = useState();

  return (
    <Modal
      title="Add Seeds"
      visible={visible}
      onCancel={() => setVisible(!visible)}
      footer={[
        <Button type="primary" onClick={() => setVisible(!visible)}>
          Done
        </Button>
      ]}
    >
      <header style={{ marginBottom: "0.5rem" }}>
        <SeedTags seeds={seeds} setSeeds={setSeeds} refetch={refetch} />
      </header>

      <div>
        <Form>
          <Form.Item label="Search for artists">
            <ApolloConsumer>
              {client => (
                <Input.Search
                  onChange={async e => {
                    if (!e.target.value) return setSearchData(null);
                    const {
                      data
                    }: { data: ISearchArtistsQuery } = await client.query({
                      query: SEARCH_ARTISTS_QUERY,
                      variables: { query: e.target.value, limit: 10 }
                    });
                    setSearchData(data);
                  }}
                  placeholder="Maximo Park..."
                />
              )}
            </ApolloConsumer>
          </Form.Item>
        </Form>

        {searchData && (
          <List
            style={{
              boxShadow: "inset 1px 2px 5px rgba(0,0,0,0.1)",
              background: "#f5f5f5",
              borderRadius: "4px",
              maxHeight: "360px",
              overflowY: "scroll"
            }}
          >
            {searchData.search.artists.items.map(
              ({ id, name, images, type, genres }: IArtist) => (
                <List.Item
                  key={id}
                  style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                >
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
                  {seeds.map(({ id }) => id).includes(id) ? (
                    <Button
                      icon="minus"
                      onClick={() => {
                        setSeeds(
                          seeds.filter(({ id: seedId }) => seedId !== id)
                        );
                      }}
                    />
                  ) : (
                    <Button
                      icon="plus"
                      onClick={() => {
                        if (seeds.length === 5)
                          return message.warning(
                            "Maximum of 5 seeds is allowed. Please remove seeds before adding more."
                          );

                        if (seeds.map(({ id: seedId }) => seedId).includes(id))
                          return message.warning(
                            `${name} has already been added as a seed. Please select a different seed.`
                          );

                        setSeeds([
                          ...seeds,
                          { id, name, images, genres, type }
                        ]);
                      }}
                    />
                  )}
                </List.Item>
              )
            )}
          </List>
        )}
      </div>
    </Modal>
  );
};

export default SeedsModal;
