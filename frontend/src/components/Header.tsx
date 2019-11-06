import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 1.5rem;

  h2 {
    margin-bottom: 0;
    margin-right: auto;
  }
`;

interface IProps {
  title: string;
  action?: React.ReactElement;
}

const Header: React.FunctionComponent<IProps> = ({ title, action }) => {
  return (
    <React.Fragment>
      <StyledHeader>
        <h2>{title}</h2>
        {action}
      </StyledHeader>
    </React.Fragment>
  );
};

export default Header;
