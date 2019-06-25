import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { MY_TOP_TRACKS_QUERY } from "../graphql/myTopTracksQuery";
import TopTracks from "../components/TopTracks";

const mocks = [
  {
    request: {
      query: MY_TOP_TRACKS_QUERY,
      variables: { limit: 20, time_range: "short_term" }
    },
    result: {
      data: {
        myTopTracks: {
          __typename: "test",
          items: [
            {
              id: "someId",
              name: "someTrackName",
              __typename: "test",
              artists: [
                {
                  id: "someArtistId",
                  name: "someArtistName",
                  __typename: "test"
                }
              ],
              album: {
                id: "someAlbumId",
                name: "someAlbumName",
                images: [
                  {
                    url: "someImageUrl",
                    __typename: "test"
                  }
                ],
                __typename: "test"
              }
            }
          ]
        }
      }
    }
  }
];

describe("<TopArtists />", () => {
  it("Queries, renders data and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <TopTracks />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // Data assertions
    expect(
      wrapper
        .find(".ant-list-item-meta-title")
        .first()
        .text()
    ).toBe("someTrackName");

    // Snapshot
    expect(
      toJSON(wrapper.find("div.ant-list.ant-list-split"))
    ).toMatchSnapshot();
  });
});
