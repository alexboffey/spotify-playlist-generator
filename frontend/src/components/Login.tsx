import React from "react";
import { Button, Card, Layout } from "antd";

const Login: React.FunctionComponent = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Card style={{ width: 400, margin: "5rem auto" }}>
        <header>
          <h1>Spotify Toolkit</h1>
        </header>
        <p>Generate playlists on the fly from your listening history .</p>
        <footer>
          <a href="/auth/spotify">
            <Button type="primary" icon="user">
              Sign In with Spotify
            </Button>
          </a>
          <Button
            style={{ marginLeft: ".5rem" }}
            type="ghost"
            icon="info-circle"
          >
            More Info
          </Button>
        </footer>
      </Card>
    </Layout>
  );
};

export default Login;
