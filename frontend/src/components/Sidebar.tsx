import React from "react";
import { Layout, Menu, Icon, Divider } from "antd";

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
        <Menu.ItemGroup title="Creation">
          <Menu.Item key="playlist">
            <Icon type="project" />
            &nbsp;Playlist
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Analytics">
          <Menu.Item key="artists">
            <Icon type="idcard" />
            &nbsp;Artists
          </Menu.Item>
          <Menu.Item key="tracks">
            <Icon type="sound" />
            &nbsp;Tracks
          </Menu.Item>
          <Menu.Item key="audio-features">
            <Icon type="box-plot" />
            &nbsp;Audio Features
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
