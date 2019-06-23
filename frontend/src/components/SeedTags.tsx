import React from "react";
import { Tag } from "antd";

import { IArtist } from "../interfaces";

interface IProps {
  seeds: Array<IArtist>;
  setSeeds: (seeds: Array<IArtist>) => void;
  refetch: () => void;
}

const SeedTags: React.FunctionComponent<IProps> = ({
  seeds,
  setSeeds,
  refetch
}) => {
  return (
    <React.Fragment>
      {seeds.map(({ name, id }) => (
        <Tag
          key={id}
          color="purple"
          closable
          onClose={() => {
            setSeeds(seeds.filter(({ id: seedId }) => seedId !== id));
            refetch();
          }}
        >
          {name}
        </Tag>
      ))}
    </React.Fragment>
  );
};

export default SeedTags;
