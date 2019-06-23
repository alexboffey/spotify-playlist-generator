import React from "react";
import { Modal, Form, Input } from "antd";

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const SavePlaylistTemlateModal: React.FunctionComponent<IProps> = ({
  visible,
  setVisible
}) => {
  return (
    <Modal
      title="Save as Playlist Template"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item label="Playlist Template Name">
          <Input placeholder="My playlist templte" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SavePlaylistTemlateModal;
