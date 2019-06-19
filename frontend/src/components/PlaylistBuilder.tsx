import React, { useState } from "react";

import Layout from "./Layout";
import SimpleRouter from "./SimpleRouter";
import Sidebar from "./Sidebar";
import Playlist from "./Playlist";
import Seeds from "./Seeds";
import AudioFeatures from "./AudioFeatures";

interface IPlaylistBuilder {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
    images: Array<{ url: string }>;
  };
}

const PlaylistBuilder: React.FunctionComponent<IPlaylistBuilder> = ({ me }) => {
  const [activeMenuKey, setActiveMenuKey] = useState("playlist");

  return (
    <Layout
      me={me}
      sidebar={() => <Sidebar setActiveMenuKey={setActiveMenuKey} />}
      content={() => (
        <SimpleRouter
          activeMenuKey={activeMenuKey}
          routes={[
            { key: "playlist", component: <Playlist /> },
            { key: "seeds", component: <Seeds /> },
            { key: "audio_features", component: <AudioFeatures /> }
          ]}
        />
      )}
    />
  );
};

export default PlaylistBuilder;
