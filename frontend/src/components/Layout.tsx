import React from "react";
import { Layout, Menu, Icon, Dropdown, Avatar, Button } from "antd";

const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;

interface IAppLayout {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
    images: Array<{ url: string }>;
  };
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children, me }) => {
  return (
    <Layout>
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
          <Sider style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
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
