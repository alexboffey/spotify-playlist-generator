import React from "react";
import { Spin, Icon, Layout } from "antd";

const LoadingScreen: React.FunctionComponent = () => (
  <Layout
    style={{
      minHeight: "100vh"
    }}
  >
    <Spin
      style={{ margin: "auto" }}
      size="large"
      indicator={<Icon type="loading" spin />}
    />
  </Layout>
);

export default LoadingScreen;
