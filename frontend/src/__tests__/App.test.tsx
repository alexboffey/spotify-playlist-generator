import React from "react";
import { mount, shallow } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { USER_QUERY } from "../graphql/userQuery";
import { GENERATE_PLAYLIST_QUERY } from "../graphql/generatePlaylist";
import { App } from "../App";

const loggedOutMocks = [
  {
    request: {
      query: USER_QUERY
    },
    result: {
      data: {
        me: null,
        __typename: "test"
      }
    }
  }
];

const loggedInMocks = [
  {
    request: {
      query: USER_QUERY
    },
    result: {
      data: {
        me: {
          id: "someUserId",
          name: "someUserName",
          email: "someUserEmail",
          spotifyId: "someSpotifyId",
          images: [
            {
              url: "someImageUrl",
              __typename: "test"
            }
          ],
          __typename: "test"
        }
      }
    }
  },
  {
    request: {
      query: GENERATE_PLAYLIST_QUERY,
      variables: {
        seeds: ""
      }
    },
    result: {
      data: {
        generatePlaylist: {
          __typename: "test",
          tracks: [
            {
              __typename: "test",
              id: "trackId",
              name: "trackName",
              preview_url: "trackPreview",
              uri: "trackUri",
              artists: [
                {
                  id: "artistId",
                  name: "artistName",
                  __typename: "test"
                }
              ],
              album: {
                id: "albumId",
                name: "albumName",
                images: [
                  {
                    url: "albumeImageUrl",
                    __typename: "test"
                  }
                ],
                __typename: "test"
              }
            }
          ],
          seeds: [{ id: "seedId", type: "seedType", __typename: "test" }]
        }
      }
    }
  }
];

describe("<App />", () => {
  it("Renders Loading component when loading", () => {
    const wrapper = mount(
      <MockedProvider mocks={loggedOutMocks}>
        <App />
      </MockedProvider>
    );

    // Assert
    expect(wrapper.find("LoadingScreen")).toHaveLength(1);
  });

  it("Renders Login component when user query returns null", async () => {
    const wrapper = mount(
      <MockedProvider mocks={loggedOutMocks}>
        <App />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // Assert
    expect(wrapper.find("Login")).toHaveLength(1);
  });

  it("Renders Wrapper component when user query returns a user", async () => {
    const wrapper = mount(
      <MockedProvider mocks={loggedInMocks}>
        <App />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // Assert
    expect(wrapper.find("Wrapper")).toHaveLength(1);
  });
});
