import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { MockedProvider } from "react-apollo/test-utils";

import { EXPORT_AS_PLAYLIST_MUTATION } from "../graphql/exportAsPlaylist";
import ExportAsPlaylistModal from "../components/ExportAsPlaylistModal";

const mocks = [
  {
    request: {
      query: EXPORT_AS_PLAYLIST_MUTATION,
      variables: {
        playlistName: "",
        tracks: ["trackIdA", "trackIdB", "trackIdC"]
      }
    },
    result: {
      data: {
        exportAsPlaylist: {
          __typename: "test",
          name: "Some arbitrary playlist name"
        }
      }
    }
  }
];

describe("<ExportAsPlaylistModal />", () => {
  const setVisible = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("Succesfully fires mutation, with intermediate loading state amd self closes", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ExportAsPlaylistModal
          visible={true}
          setVisible={setVisible}
          tracks={mocks[0].request.variables.tracks}
        />
      </MockedProvider>
    );

    await wait();
    wrapper.update();

    // Click button to fire mutation
    wrapper.find("button[title='Export']").simulate("click");

    // Check button is disabled during loading
    expect(wrapper.find("button[title='Export']").prop("disabled")).toBe(true);

    await wait();
    wrapper.update();

    // Expect button to not be disabled after mutation
    expect(wrapper.find("button[title='Export']").prop("disabled")).toBe(false);
    // Expect modal close mock to be called
    expect(setVisible).toHaveBeenCalledWith(false);
  });
});
