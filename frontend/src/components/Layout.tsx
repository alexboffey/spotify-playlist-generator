import React from "react";
import { Layout, Menu, Icon, Dropdown, Avatar } from "antd";

const { Content, Footer, Header } = Layout;

interface IAppLayout {
  me: {
    id: string;
    name: string;
    email: string;
    spotifyId: string;
    images: Array<{ url: string }>;
  };
  content: () => React.ReactElement;
  sidebar: () => React.ReactElement;
  className?: string;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({
  content,
  sidebar,
  me,
  className
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }} className={className}>
      <Header style={{ background: "#fff", padding: "0 2rem" }}>
        <div style={{ display: "flex", maxWidth: "1360px" }}>
          <h1>
            <Icon type="tool" style={{ marginRight: ".8rem" }} />
            Spotify Toolkit
          </h1>
          <nav style={{ marginLeft: "auto" }}>
            <Dropdown
              placement="bottomRight"
              overlay={() => (
                <Menu style={{ minWidth: 160 }}>
                  {/* <Menu.Item key="0">
                  <Icon type="user" /> Profile
                </Menu.Item>
                <Menu.Divider /> */}
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
        </div>
      </Header>

      <Content
        style={{
          padding: "0 2rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <Layout
          style={{
            padding: "1rem 0",
            background: "#fff",
            maxWidth: "1360px",
            borderTop: "3px solid #722ed1"
          }}
        >
          {sidebar()}
          <Content style={{ padding: "0 1.5rem", minHeight: 280 }}>
            {content()}
          </Content>
        </Layout>
      </Content>

      <Footer style={{ background: "#fff" }}>
        <div style={{ textAlign: "center", maxWidth: "1360px" }}>
          &copy;{new Date().getFullYear()} Spotify Toolkit. Created by{" "}
          <a
            style={{
              color: "rgba(0, 0, 0, 0.65)",
              textDecoration: "underline"
            }}
            href="https://alexboffey.co.uk/"
            title="Alex Boffey's Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alex Boffey
          </a>
          .
        </div>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
