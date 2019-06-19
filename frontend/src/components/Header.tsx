import React from "react";
import { Divider } from "antd";

const Header: React.FunctionComponent<{ title: string }> = ({ title }) => {
  return (
    <React.Fragment>
      <header
        style={{ display: "flex", alignItems: "center", marginTop: ".5rem" }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
      </header>
      <Divider />
    </React.Fragment>
  );
};

export default Header;
