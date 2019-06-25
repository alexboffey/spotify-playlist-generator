import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { MY_TOP_ARTISTS_QUERY } from "../graphql/myTopArtistsQuery";
import TopArtists from "../components/TopArtists";

const mocks = [
  {
    request: {
      query: MY_TOP_ARTISTS_QUERY,
      variables: { limit: 20, time_range: "short_term" }
    },
    result: {
      data: {
        myTopArtists: {
          __typename: "test",
          items: [
            {
              id: "someId",
              name: "someName",
              genres: ["genreA", "genreB"],
              images: [{ url: "someImageUrl", __typename: "test" }],
              __typename: "test"
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
        <TopArtists />
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
    ).toBe("someName");

    // Snapshot assertion
    expect(
      toJSON(wrapper.find("div.ant-list.ant-list-split"))
    ).toMatchSnapshot();
  });
});
