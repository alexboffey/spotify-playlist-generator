import React, { useState, useEffect, useContext } from "react";
import { List, Avatar, Button } from "antd";
import { reverse } from "lodash";

import { PlayingContext } from "./PlayingContext";

interface IProps {
  id: string;
  name: string;
  preview_url?: string;
  artists: Array<{ id: string; name: string }>;
  album: { id: string; name: string; images: Array<{ url: string }> };
}

const Track: React.FunctionComponent<IProps> = ({
  id,
  name,
  artists,
  album,
  preview_url
}) => {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState();
  const { currentlyPlaying, setCurrentlyPlaying } = useContext(PlayingContext);

  // Initialise audio object as side effect
  useEffect(() => {
    setAudio(new Audio(preview_url));
  }, [preview_url]);

  // Stop audio playing on unmount
  useEffect(() => {
    return function cleanup() {
      if (playing && currentlyPlaying && currentlyPlaying.id === id) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
      }
    };
  }, [playing, currentlyPlaying, setPlaying, setCurrentlyPlaying]);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            shape="square"
            size="large"
            src={album.images.length > 0 ? reverse(album.images)[0].url : ""}
          >
            {name.split("")[0]}
          </Avatar>
        }
        title={<span>{name}</span>}
        description={artists.map(({ name }) => name).join(", ")}
      />
      <Button
        disabled={!preview_url}
        title={preview_url ? "Preview track" : "Track preview not available"}
        icon={playing ? "pause-circle" : "play-circle"}
        onClick={() => {
          if (playing) {
            audio.pause();
            audio.currentTime = 0;
            setPlaying(false);
            setCurrentlyPlaying({ id: null, audio: null });
          } else if (!playing) {
            audio.play();
            setPlaying(true);
            setCurrentlyPlaying({ id, audio });
          }
        }}
      >
        {playing ? "Pause" : "Play"}
      </Button>
    </List.Item>
  );
};

export default Track;
