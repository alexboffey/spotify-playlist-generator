import React from "react";

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
  return (
    <Layout
      me={me}
      sidebar={setActiveMenuKey => (
        <Sidebar setActiveMenuKey={setActiveMenuKey} />
      )}
      content={activeMenuKey => {
        if (activeMenuKey === "playlist") return <Playlist />;
        if (activeMenuKey === "seeds") return <p>Seeds</p>;
        if (activeMenuKey === "audio_features") return <p>Audio Features</p>;
        return <p>Unexpected Menu Key</p>;
      }}
    />
  );
};

export default PlaylistBuilder;
