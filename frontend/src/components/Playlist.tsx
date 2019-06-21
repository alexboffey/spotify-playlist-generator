import React from "react";
import { Query } from "react-apollo";
import { Spin, message, List, Button, Tag, Empty, Icon } from "antd";

import {
  GENERATE_PLAYLIST_QUERY,
  IGeneratePlaylistQuery
} from "../graphql/generatePlaylist";
import Track from "./Track";
import Header from "./Header";
import { IArtist } from "../interfaces";

interface IProps {
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
}

const Playlist: React.FunctionComponent<IProps> = ({ seeds, setSeeds }) => {
  const formattedSeeds = seeds.map(({ id }) => id).join(",");

  return (
    <React.Fragment>
      <Header title="Playlist" />
      <Query<IGeneratePlaylistQuery>
        query={GENERATE_PLAYLIST_QUERY}
        variables={{ seeds: formattedSeeds }}
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
                {seeds.length > 0 && (
                  <div
                    className="playlist-controls__seeds"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "auto"
                    }}
                  >
                    {seeds.map(({ name, id }) => (
                      <Tag
                        color="blue"
                        closable
                        onClose={() => {
                          setSeeds(
                            seeds.filter(({ id: seedId }) => seedId !== id)
                          );
                          refetch();
                        }}
                      >
                        {name}
                      </Tag>
                    ))}
                  </div>
                )}

                <Button
                  type="ghost"
                  onClick={() => refetch()}
                  icon="reload"
                  style={{ marginBottom: 0 }}
                  disabled={loading}
                >
                  Regenerate
                </Button>
              </div>

              {loading && <Spin indicator={<Icon type="loading" spin />} />}

              {data && !loading && (
                <List>
                  {data.generatePlaylist.tracks.map(track => (
                    <Track key={track.id} {...track} />
                  ))}
                </List>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default Playlist;
