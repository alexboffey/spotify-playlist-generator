import React, { useState } from "react";
import { List, Avatar, Button } from "antd";

interface IPlayer {
  audio: {
    play: () => void;
    pause: () => void;
    currentTime: number;
  };
}

const Player: React.FunctionComponent<IPlayer> = ({ audio }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <Button
      icon={playing ? "pause-circle" : "play-circle"}
      onClick={() => {
        if (playing) {
          audio.pause();
          audio.currentTime = 0;
          setPlaying(false);
        } else if (!playing) {
          audio.play();
          setPlaying(true);
        }
      }}
    >
      {playing ? "Pause" : "Play"}
    </Button>
  );
};

interface ITrack {
  id: string;
  name: string;
  preview_url?: string;
  artists: Array<{ id: string; name: string }>;
  album: { id: string; name: string; images: Array<{ url: string }> };
}

const Track: React.FunctionComponent<ITrack> = ({
  name,
  artists,
  album,
  preview_url
}) => {
  const audio = new Audio(preview_url);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            size="large"
            src={album.images[0] ? album.images[0].url : ""}
          >
            {name.split("")[0]}
          </Avatar>
        }
        title={<span>{name}</span>}
        description={artists.map(({ name }) => name).join(", ")}
      />
      <Player audio={audio} />
    </List.Item>
  );
};

export default Track;
