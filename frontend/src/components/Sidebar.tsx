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
        <Menu.ItemGroup title="Creation">
          <Menu.Item key="playlist">
            <Icon type="project" />
            &nbsp;Playlist Generator
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Analytics">
          <Menu.Item key="artists">
            <Icon type="idcard" />
            &nbsp;Top Artists
          </Menu.Item>
          <Menu.Item key="tracks">
            <Icon type="sound" />
            &nbsp;Top Tracks
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
