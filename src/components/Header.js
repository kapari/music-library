import React from 'react';
import styled from '@emotion/styled';
import theme from '../utils/colors';

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.contentBorder};
  background-color: ${theme.contentBg};
  padding: 20px 50px;
  color: ${theme.headingText};
`;

function AppHeader() {
  return (
    <Header>
      <h1>Music Library</h1>
      <nav></nav>
    </Header>
  );
}

export default AppHeader;
