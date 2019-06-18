import React from "react";
import { Button, Card } from "antd";

const Login: React.FC = () => {
  return (
    <Card style={{ width: 400, margin: "0 auto" }}>
      <header>
        <h1>Spotify Playlist Generator</h1>
      </header>
      <p>Please sign in to continue</p>
      <footer>
        <a href="/auth/spotify">
          <Button type="primary" icon="user">
            Sign In with Spotify
          </Button>
        </a>
        <Button style={{ marginLeft: ".5rem" }} type="ghost" icon="info-circle">
          More Info
        </Button>
      </footer>
    </Card>
  );
};

export default Login;
