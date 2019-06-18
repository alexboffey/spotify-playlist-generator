import React from "react";
import { Button, Card, Layout } from "antd";

const Login: React.FunctionComponent = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Card style={{ width: 400, margin: "5rem auto" }}>
        <header>
          <h1>Spotify Playlist Generator</h1>
        </header>
        <p>Generate spotify playlists on the fly based on your listening history, artist, track or genre seeds and Spotify's audio properties.</p>
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
