import React from "react";

export const PlayingContext = React.createContext({
  currentlyPlaying: { id: null, audio: null },
  setCurrentlyPlaying: (val: { id: any; audio: any }) => {}
});
