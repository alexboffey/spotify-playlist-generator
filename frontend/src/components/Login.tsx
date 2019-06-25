import React from "react";
import { Button, Card, Layout, Typography } from "antd";

const { Title } = Typography;

const Login: React.FunctionComponent = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      className="layout-pattern-background"
    >
      <Card
        style={{ width: 400, marginTop: -200, borderTop: "3px solid #722ed1" }}
      >
        <header>
          <Title style={{ fontSize: "36px" }}>Spotify Toolkit</Title>
        </header>
        <p className="lead">
          Use your listening history from Spotify to see your top artists,
          tracks and generate playlists based on them.
        </p>
        <footer>
          <a href="/auth/spotify">
            <Button size="large" type="primary" icon="user">
              Sign In with Spotify
            </Button>
          </a>
        </footer>
      </Card>
    </Layout>
  );
};

export default Login;
