import React from "react";
import { mount } from "enzyme";

import Track from "../components/Track";
import { PlayingContext } from "../components/PlayingContext";

describe("<Track />", () => {
  const playMock = (global.Audio.prototype.play = jest.fn());
  const pauseMock = (global.Audio.prototype.pause = jest.fn());
  const eventListenerMock = (global.Audio.prototype.addEventListener = jest.fn());

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders play button when supplied preview_url prop", () => {
    const wrapper = mount(
      <Track
        id="someTrackId"
        name="someTrackName"
        preview_url="somePreviewUrl"
        artists={[{ id: "someArtistId", name: "someArtistName" }]}
        album={{
          id: "someAlbumId",
          name: "someAlbumName",
          images: [{ url: "someImageUrl" }]
        }}
      />
    );

    expect(wrapper.find("button[title='Preview track']")).toHaveLength(1);
  });

  it("renders disabled play button when not supplied preview_url prop", () => {
    const wrapper = mount(
      <Track
        id="someTrackId"
        name="someTrackName"
        preview_url={null}
        artists={[{ id: "someArtistId", name: "someArtistName" }]}
        album={{
          id: "someAlbumId",
          name: "someAlbumName",
          images: [{ url: "someImageUrl" }]
        }}
      />
    );

    expect(
      wrapper.find("button[title='Track preview not available']")
    ).toHaveLength(1);
    expect(
      wrapper
        .find("button[title='Track preview not available']")
        .prop("disabled")
    ).toBe(true);
  });

  it("attempts to play and pause audio when play button is clicked", () => {
    const wrapper = mount(
      <PlayingContext.Provider
        value={{
          currentlyPlaying: { id: "notSomeTrackId", audio: jest.fn() },
          setCurrentlyPlaying: jest.fn()
        }}
      >
        <Track
          id="someTrackId"
          name="someTrackName"
          preview_url="somePreviewUrl"
          artists={[{ id: "someArtistId", name: "someArtistName" }]}
          album={{
            id: "someAlbumId",
            name: "someAlbumName",
            images: [{ url: "someImageUrl" }]
          }}
        />
      </PlayingContext.Provider>
    );

    // Play
    wrapper.find("button[title='Preview track']").simulate("click");

    expect(playMock).toHaveBeenCalled();
    expect(eventListenerMock).toHaveBeenCalled();

    // Pause
    wrapper.find("button[title='Preview track']").simulate("click");

    expect(pauseMock).toHaveBeenCalled();
  });

  it("pauses audio when clicked while playing", () => {
    const wrapper = mount(
      <PlayingContext.Provider
        value={{
          currentlyPlaying: { id: "someTrackId", audio: jest.fn() },
          setCurrentlyPlaying: jest.fn()
        }}
      >
        <Track
          id="someTrackId"
          name="someTrackName"
          preview_url="somePreviewUrl"
          artists={[{ id: "someArtistId", name: "someArtistName" }]}
          album={{
            id: "someAlbumId",
            name: "someAlbumName",
            images: [{ url: "someImageUrl" }]
          }}
        />
      </PlayingContext.Provider>
    );

    wrapper.find("button[title='Preview track']").simulate("click");
    expect(playMock).toHaveBeenCalled();
    expect(eventListenerMock).toHaveBeenCalled();

    wrapper.unmount();
    expect(pauseMock).toHaveBeenCalled();
  });
});
