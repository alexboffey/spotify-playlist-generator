import React from "react";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

interface ISidebar {
  setActiveMenuKey: (key: string) => void;
}

const Sidebar: React.FunctionComponent<ISidebar> = ({ setActiveMenuKey }) => {
  return (
    <Sider style={{ background: "#fff" }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["playlist"]}
        style={{ height: "100%" }}
        onClick={({ key }) => setActiveMenuKey(key)}
      >
        <Menu.Item key="playlist">
          <Icon type="unordered-list" />
          &nbsp;Playlist
        </Menu.Item>
        <Menu.Item key="seeds">
          <Icon type="build" />
          &nbsp;Seeds
        </Menu.Item>
        <Menu.Item key="audio_features">
          <Icon type="sound" />
          &nbsp;Audio Features
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
