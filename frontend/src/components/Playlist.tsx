import React from "react";
import { Query } from "react-apollo";
import { Spin, message, List, Button } from "antd";

import {
  GENERATE_PLAYLIST_QUERY,
  IGeneratePlaylistQuery
} from "../graphql/generatePlaylist";
import Track from "./Track";
import Header from "./Header";
import { IArtist } from "../interfaces";

interface IProps {
  seeds: Array<IArtist>;
}

const Playlist: React.FunctionComponent<IProps> = ({ seeds }) => {
  const formattedSeeds = seeds.map(({ id }) => id).join(",");

  return (
    <React.Fragment>
      <Header title="Playlist" />
      <Query<IGeneratePlaylistQuery>
        query={GENERATE_PLAYLIST_QUERY}
        variables={{ seeds: formattedSeeds }}
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
    </React.Fragment>
  );
};

export default Playlist;
