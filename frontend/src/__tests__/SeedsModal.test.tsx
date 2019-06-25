import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { SEARCH_ARTISTS_QUERY } from "../graphql/search";
import SeedsModal, { SeedsModalSearch } from "../components/SeedsModal";

const mocks = [
  {
    request: {
      query: SEARCH_ARTISTS_QUERY,
      variables: {
        query: "test_search",
        type: "artist",
        limit: 10
      }
    },
    result: {
      data: {
        search: {
          __typename: "test",
          artists: {
            __typename: "test",
            items: {
              __typename: "test",
              id: "someId",
              name: "someName",
              type: "someType",
              images: [
                {
                  __typename: "test",
                  url: "someUrl"
                }
              ],
              genres: ["someGenre"]
            }
          }
        }
      }
    }
  }
];

describe("<SeedsModal />", () => {
  const setSeeds = jest.fn();
  const setVisible = jest.fn();
  const refetch = jest.fn();
  const setSearchData = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Calls set visible when closed", () => {
    const wrapper = mount(
      <MockedProvider>
        <SeedsModal
          visible={true}
          seeds={[]}
          setSeeds={setSeeds}
          setVisible={setVisible}
          refetch={refetch}
        />
      </MockedProvider>
    );

    wrapper.find("button[title='done']").simulate("click");
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it("Queries search successfully and passes it to parent state", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SeedsModalSearch setSearchData={setSearchData} />
      </MockedProvider>
    );

    // Simulate text input to trigger search query
    wrapper
      .find("input")
      .simulate("change", { target: { value: "test_search" } });

    await wait();
    wrapper.update();

    expect(setSearchData).toHaveBeenCalledWith(mocks[0].result.data);
  });
});
