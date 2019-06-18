import React, { useState } from "react";
import { Query } from "react-apollo";
import { Spin, message, List, Divider, Avatar, Button } from "antd";
import { shuffle } from "lodash";

import {
  MY_TOP_ARTISTS_QUERY,
  IMyTopArtistsQuery
} from "../graphql/myTopArtistsQuery";
import {
  GET_RECOMMENDATIONS_QUERY,
  IGetRecommendationsQuery
} from "../graphql/getRecommendations";

interface ITrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: { id: string; name: string; images: Array<{ url: string }> };
}

const Track: React.FunctionComponent<ITrack> = ({ name, artists, album }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar shape="square" size="large" src={album.images[0].url} />
        }
        title={<span>{name}</span>}
        description={artists.map(({ name }) => name).join(", ")}
      />
    </List.Item>
  );
};

const Playlist: React.FunctionComponent = () => {
  return (
    <div>
      <header
        style={{ display: "flex", alignItems: "center", marginTop: ".5rem" }}
      >
        <h2 style={{ margin: 0 }}>
          This playlist was generated from your top 5 spotify artists
        </h2>
        <Button
          disabled
          type="ghost"
          icon="reload"
          style={{ marginLeft: "auto" }}
        >
          Regenerate
        </Button>
      </header>
      <Divider />

      <Query<IMyTopArtistsQuery>
        query={MY_TOP_ARTISTS_QUERY}
        variables={{ limit: 40 }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spin />;
          if (error) return message.error(error);
          if (data) {
            // Format into string for next query
            const seed_artists = shuffle(data.myTopArtists.items)
              .slice(0, 5)
              .map(({ id }) => id)
              .join(",");

            return (
              <Query<IGetRecommendationsQuery>
                query={GET_RECOMMENDATIONS_QUERY}
                variables={{ seed_artists }}
              >
                {({ data, loading, error, refetch }) => {
                  if (loading) return <Spin />;
                  if (error) return message.error(error);
                  if (data) {
                    return (
                      <React.Fragment>
                        <Button
                          type="ghost"
                          onClick={() => refetch()}
                          icon="reload"
                        >
                          Regenerate
                        </Button>
                        <List>
                          {data.getRecommendations.tracks.map(track => (
                            <Track key={track.id} {...track} />
                          ))}
                        </List>
                      </React.Fragment>
                    );
                  }
                }}
              </Query>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default Playlist;
