import React, { useState } from "react";
import { Layout, Menu, Icon, Dropdown, Avatar } from "antd";

const { Content, Footer, Sider, Header } = Layout;

interface IAppLayout {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
    images: Array<{ url: string }>;
  };
  content: (activeMenuKey: string) => any;
  sidebar: (setActiveMenuKey: (key: string) => void) => any;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({
  content,
  sidebar,
  me
}) => {
  const [activeMenuKey, setActiveMenuKey] = useState("playlist");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", background: "#fff" }}>
        <h1>Spotify Playlist Generator</h1>
        <nav style={{ marginLeft: "auto" }}>
          <Dropdown
            placement="bottomRight"
            overlay={() => (
              <Menu style={{ minWidth: 160 }}>
                <Menu.Item key="0">
                  <Icon type="user" /> Profile
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                  <a href="/auth/logout">
                    <Icon type="logout" />
                    &nbsp; Sign Out
                  </a>
                </Menu.Item>
              </Menu>
            )}
          >
            <span
              style={{
                padding: ".5rem",
                cursor: "pointer"
              }}
            >
              <Avatar
                size="small"
                src={me.images[0].url || ""}
                style={{ marginRight: ".5rem" }}
              >
                {!me.images[0].url &&
                  me.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
              </Avatar>
              {me.name} <Icon type="down" />
            </span>
          </Dropdown>
        </nav>
      </Header>

      <Content style={{ padding: "0 50px", marginTop: "24px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          {sidebar(setActiveMenuKey)}
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {content(activeMenuKey)}
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        &copy;{new Date().getFullYear()}. Spotify Playlist Generator.
      </Footer>
    </Layout>
  );
};

export default AppLayout;
