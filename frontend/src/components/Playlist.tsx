import React, { useState } from "react";
import { Query } from "react-apollo";
import { message, List, Button, Tag, Empty, Icon } from "antd";

import {
  GENERATE_PLAYLIST_QUERY,
  IGeneratePlaylistQuery
} from "../graphql/generatePlaylist";
import Track from "./Track";
import Header from "./Header";
import SeedsModal from "./SeedsModal";
import { IArtist } from "../interfaces";
import SeedTags from "./SeedTags";

interface IProps {
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
}

const Playlist: React.FunctionComponent<IProps> = ({ seeds, setSeeds }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const formattedSeeds = seeds.map(({ id }) => id).join(",");

  return (
    <React.Fragment>
      <Header title="Playlist" />
      <Query<IGeneratePlaylistQuery>
        query={GENERATE_PLAYLIST_QUERY}
        variables={{ seeds: formattedSeeds }}
        notifyOnNetworkStatusChange
      >
        {({ data, loading, error, refetch }) => {
          if (error) {
            message.error(error);
            return <Empty description="Something went wrong..." />;
          }

          return (
            <React.Fragment>
              <div
                className="playlist-controls"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem"
                }}
              >
                <div
                  className="playlist-controls__seeds"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "auto"
                  }}
                >
                  <Button
                    icon="plus"
                    onClick={() => setVisible(!visible)}
                    style={{ marginRight: "1rem" }}
                  >
                    Add Seeds
                  </Button>
                  <SeedsModal
                    visible={visible}
                    setVisible={setVisible}
                    seeds={seeds}
                    setSeeds={setSeeds}
                    refetch={refetch}
                  />

                  <SeedTags
                    seeds={seeds}
                    setSeeds={setSeeds}
                    refetch={refetch}
                  />
                </div>

                <Button
                  type="ghost"
                  onClick={() => refetch()}
                  icon="reload"
                  disabled={loading}
                >
                  Regenerate
                </Button>
              </div>

              <List loading={loading}>
                {data &&
                  !loading &&
                  data.generatePlaylist.tracks.map(track => (
                    <Track key={track.id} {...track} />
                  ))}
              </List>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default Playlist;
