import React from "react";
import { Modal } from "antd";

import { IArtist } from "../interfaces";
import Search from "./Search";
import SeedTags from "./SeedTags";

interface IProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
  refetch: () => void;
}

const SeedsModal: React.FunctionComponent<IProps> = ({
  visible,
  setVisible,
  seeds,
  setSeeds,
  refetch
}) => {
  return (
    <Modal
      title="Add Seeds"
      visible={visible}
      onOk={() => setVisible(!visible)}
      onCancel={() => setVisible(!visible)}
    >
      <header style={{ marginBottom: "0.5rem" }}>
        <SeedTags seeds={seeds} setSeeds={setSeeds} refetch={refetch} />
      </header>
      <Search seeds={seeds} setSeeds={setSeeds} />
    </Modal>
  );
};

export default SeedsModal;
