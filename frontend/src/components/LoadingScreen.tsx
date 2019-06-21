import React from "react";
import { Spin, Layout } from "antd";

const LoadingScreen: React.FunctionComponent = () => (
  <Layout
    style={{
      minHeight: "100vh"
    }}
  >
    <Spin
      style={{ margin: "auto" }}
    />
  </Layout>
);

export default LoadingScreen;
