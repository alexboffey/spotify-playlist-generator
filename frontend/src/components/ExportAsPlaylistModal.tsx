import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Mutation } from "react-apollo";

import {
  EXPORT_AS_PLAYLIST_MUTATION,
  IExportAsPlaylistMutation
} from "../graphql/exportAsPlaylist";

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  tracks: Array<string>;
}

const ExportAsPlaylistModal: React.FunctionComponent<IProps> = ({
  visible,
  setVisible,
  tracks
}) => {
  const [playlistName, setPlaylistName] = useState<string>("");

  return (
    <Mutation<IExportAsPlaylistMutation>
      mutation={EXPORT_AS_PLAYLIST_MUTATION}
      variables={{ playlistName, tracks }}
      onCompleted={data => {
        message.success(
          `You successfully created a Spotify Playlist: ${
            data.exportAsPlaylist.name
          }!`
        );
        setPlaylistName("");
        setVisible(false);
      }}
    >
      {(exportAsPlaylist, { loading, data, error }) => {
        if (error) message.error(error);

        return (
          <Modal
            title="Export as Spotify Playlist"
            visible={visible}
            onCancel={() => setVisible(false)}
            footer={[
              <Button
                key="cancel-button"
                onClick={() => {
                  setPlaylistName("");
                  setVisible(false);
                }}
                title="cancel"
              >
                Cancel
              </Button>,
              <Button
                key="save-button"
                disabled={loading}
                onClick={() => {
                  exportAsPlaylist();
                }}
                type="primary"
                title="Export"
              >
                Export
              </Button>
            ]}
          >
            <Form>
              <Form.Item label="Playlist Name">
                <Input
                  value={playlistName}
                  placeholder="My Playlist"
                  onChange={e => setPlaylistName(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    </Mutation>
  );
};

export default ExportAsPlaylistModal;
