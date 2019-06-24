import React from "react";
import { Divider } from "antd";

interface IProps {
  title: string;
  action?: React.ReactElement;
}

const Header: React.FunctionComponent<IProps> = ({ title, action }) => {
  return (
    <React.Fragment>
      <header
        style={{ display: "flex", alignItems: "center", marginTop: ".5rem" }}
      >
        <h2 style={{ marginBottom: 0, marginRight: "auto" }}>{title}</h2>
        {action}
      </header>
      <Divider />
    </React.Fragment>
  );
};

export default Header;
