import React from "react";
import { Menu, Button } from "antd";
import styled from "styled-components";

import { HistoricalTerms } from "../types";

interface TermSwitcherProps {
  onClick: (e: any) => void;
  currentKey: HistoricalTerms;
}

const StyledMenu = styled(Menu)`
  margin-bottom: 2rem;
  margin-top: 0;

  & > .ant-menu-item {
    padding: 0 10px;
  }
`;

const TermSwitcher: React.FunctionComponent<TermSwitcherProps> = ({
  onClick,
  currentKey
}) => {
  return (
    <StyledMenu mode="horizontal" selectedKeys={[currentKey]} onClick={onClick}>
      <Menu.Item key="short_term">
        <Button size="small">Short Term</Button>
      </Menu.Item>
      <Menu.Item key="medium_term">
        <Button size="small">Mid Term</Button>
      </Menu.Item>
      <Menu.Item key="long_term">
        <Button size="small">Long Term</Button>
      </Menu.Item>
    </StyledMenu>
  );
};

export default TermSwitcher;
