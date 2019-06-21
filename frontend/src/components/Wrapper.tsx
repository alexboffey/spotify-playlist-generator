import React, { useState } from "react";

import Layout from "./Layout";
import SimpleRouter from "./SimpleRouter";
import Sidebar from "./Sidebar";
import Playlist from "./Playlist";
import { IMe, IArtist } from "../interfaces";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks"

interface IProps {
  me: IMe;
}

const Wrapper: React.FunctionComponent<IProps> = ({ me }) => {
  const [activeMenuKey, setActiveMenuKey] = useState("playlist");
  const [seeds, setSeeds] = useState<Array<IArtist>>([]);

  return (
    <Layout
      me={me}
      sidebar={() => <Sidebar setActiveMenuKey={setActiveMenuKey} />}
      content={() => (
        <SimpleRouter
          activeMenuKey={activeMenuKey}
          routes={[
            {
              key: "playlist",
              component: <Playlist seeds={seeds} setSeeds={setSeeds} />
            }, {
              key: "artists",
              component: <TopArtists />
            }, {
              key: "tracks",
              component: <TopTracks />
            }
          ]}
        />
      )}
    />
  );
};

export default Wrapper;
