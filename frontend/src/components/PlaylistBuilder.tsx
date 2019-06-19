import React, { useState } from "react";

import Layout from "./Layout";
import Playlist from "./Playlist";
import Sidebar from "./Sidebar";

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
      content={() => {
        if (activeMenuKey === "playlist") return <Playlist />;
        if (activeMenuKey === "seeds") return <p>Seeds</p>;
        if (activeMenuKey === "audio_features") return <p>Audio Features</p>;
        return <p>Unexpected Menu Key</p>;
      }}
    />
  );
};

export default PlaylistBuilder;
