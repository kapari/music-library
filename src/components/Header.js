import React from 'react';
import styled from '@emotion/styled';

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #777;
  background-color: rgba(0,0,0,0.8);
  padding: 20px 50px;
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
