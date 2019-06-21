import React, { useState } from "react";

import Layout from "./Layout";
import SimpleRouter from "./SimpleRouter";
import Sidebar from "./Sidebar";
import Playlist from "./Playlist";
import Seeds from "./Seeds";
import AudioFeatures from "./AudioFeatures";
import { IMe, IArtist } from "../interfaces";

interface IProps {
  me: IMe;
}

const PlaylistBuilder: React.FunctionComponent<IProps> = ({ me }) => {
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
            { key: "playlist", component: <Playlist /> },
            {
              key: "seeds",
              component: <Seeds seeds={seeds} setSeeds={setSeeds} />
            },
            { key: "audio_features", component: <AudioFeatures /> }
          ]}
        />
      )}
    />
  );
};

export default PlaylistBuilder;
