import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { GENERATE_PLAYLIST_QUERY } from "../graphql/generatePlaylist";
import Playlist from "../components/Playlist";

const mocks = [
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
            },
            {
              __typename: "test",
              id: "trackId2",
              name: "trackName",
              preview_url: "trackPreview",
              uri: "trackUri",
              artists: [
                {
                  id: "artistId2",
                  name: "artistName",
                  __typename: "test"
                }
              ],
              album: {
                id: "albumId2",
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

describe("<Playlist />", () => {
  const setSeeds = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Queries, renders data and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Playlist seeds={[]} setSeeds={setSeeds} />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find(".ant-list"))).toMatchSnapshot();
  });

  it("Refetches data with load state after regenerate button is pressed", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Playlist seeds={[]} setSeeds={setSeeds} />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    expect(wrapper.find(".ant-list-item")).toHaveLength(1);

    // Simulate event
    wrapper
      .find("button.ant-btn[title='Regenerate Playlist']")
      .simulate("click");

    expect(wrapper.find(".ant-spin-nested-loading")).toHaveLength(1);

    // Wait for update again
    await wait();
    wrapper.update();

    expect(wrapper.find(".ant-list-item")).toHaveLength(2);
    expect(toJSON(wrapper.find(".ant-list"))).toMatchSnapshot();
  });
});
