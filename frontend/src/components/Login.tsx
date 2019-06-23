import React from "react";
import { Button, Card, Layout } from "antd";

const Login: React.FunctionComponent = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card style={{ width: 400, marginTop: -200, borderTop: "3px solid #722ed1" }}>
        <header>
          <h1>Spotify Toolkit</h1>
        </header>
        <p>Use your listening history on Spotify to see your top artists, tracks and generate playlists based on them.</p>
        <footer>
          <a href="/auth/spotify">
            <Button type="primary" icon="user">
              Sign In with Spotify
            </Button>
          </a>
          {/* <Button
            style={{ marginLeft: ".5rem" }}
            type="ghost"
            icon="info-circle"
          >
            More Info
          </Button> */}
        </footer>
      </Card>
    </Layout>
  );
};

export default Login;
