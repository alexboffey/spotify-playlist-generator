import React from "react";

export const PlayingContext = React.createContext({
  currentlyPlaying: "",
  setCurrentlyPlaying: (val: string) => {}
});
