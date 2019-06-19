import React from "react";
import { Query } from "react-apollo";
import { Spin, message, List, Divider, Button } from "antd";

import Track from "./Track";
import {
  GENERATE_PLAYLIST_QUERY,
  IGeneratePlaylistQuery
} from "../graphql/generatePlaylist";

const Playlist: React.FunctionComponent = () => {
  return (
    <div>
      <header
        style={{ display: "flex", alignItems: "center", marginTop: ".5rem" }}
      >
        <h2 style={{ margin: 0 }}>Playlist</h2>
      </header>
      <Divider />

      <Query<IGeneratePlaylistQuery> query={GENERATE_PLAYLIST_QUERY}>
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
                  style={{ marginBottom: "1rem" }}
                >
                  Regenerate
                </Button>
                <List>
                  {data.generatePlaylist.tracks.map(track => (
                    <Track key={track.id} {...track} />
                  ))}
                </List>
              </React.Fragment>
            );
          }
        }}
      </Query>
    </div>
  );
};

export default Playlist;
