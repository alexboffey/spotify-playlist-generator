import React, { useState } from "react";
import { Query } from "react-apollo";
import { message, List, Button, Empty } from "antd";

import {
  GENERATE_PLAYLIST_QUERY,
  IGeneratePlaylistQuery
} from "../graphql/generatePlaylist";
import Track from "./Track";
import Header from "./Header";
import SeedsModal from "./SeedsModal";
import { IArtist } from "../interfaces";
import SeedTags from "./SeedTags";
import ExportAsPlaylistModal from "./ExportAsPlaylistModal";

interface IProps {
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
}

const Playlist: React.FunctionComponent<IProps> = ({ seeds, setSeeds }) => {
  const [seedsModalVisible, setSeedsModalVisible] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisible] = useState<boolean>(false);
  const formattedSeeds = seeds.map(({ id }) => id).join(",");

  return (
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

        // if (data && data.generatePlaylist) console.log(data);

        return (
          <React.Fragment>
            <Header title="Playlist" />
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
                  onClick={() => setSeedsModalVisible(!seedsModalVisible)}
                  style={{ marginRight: "1rem" }}
                  disabled={loading}
                  title="Add Seeds"
                >
                  Add Seeds
                </Button>
                <SeedsModal
                  visible={seedsModalVisible}
                  setVisible={setSeedsModalVisible}
                  seeds={seeds}
                  setSeeds={setSeeds}
                  refetch={refetch}
                />

                <SeedTags seeds={seeds} setSeeds={setSeeds} refetch={refetch} />
              </div>

              <Button
                type="ghost"
                onClick={() => refetch()}
                icon="reload"
                disabled={loading}
                style={{ marginRight: ".5rem" }}
                title="Regenerate Playlist"
              />

              <Button
                type="ghost"
                icon="save"
                disabled={loading}
                style={{ marginRight: ".5rem" }}
                title="Export as Spotify Playlist"
                onClick={() => setExportModalVisible(!exportModalVisible)}
              />
              <ExportAsPlaylistModal
                visible={exportModalVisible}
                setVisible={setExportModalVisible}
                tracks={
                  data && !loading
                    ? data.generatePlaylist.tracks.map(({ uri }) => uri)
                    : []
                }
              />

              {/* <Button
                type="ghost"
                icon="save"
                disabled={loading}
                title="Save as Template"
              /> */}
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
  );
};

export default Playlist;
