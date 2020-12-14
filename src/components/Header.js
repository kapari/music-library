import React, { useState } from 'react';
import PropTypes from 'prop-types';
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


function AppHeader({ username, onSubmitUser }) {
  const [tempUsername, setTempUsername] = useState(username);
  const onChangeTempUser = (e) => {
    setTempUsername(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitUser(tempUsername);
  }
  return (
    <Header>
      <h1>Music Library</h1>
      <form>
        <label>
          <div>Choose a Discogs user</div>
          <input type="text" onChange={onChangeTempUser} value={tempUsername} />
        </label>
        <button type="submit" onClick={(e) => onSubmit(e)}>
          Load Albums
        </button>
      </form>
    </Header>
  );
}

AppHeader.propTypes = {
  username: PropTypes.string.isRequired,
  onSubmitUser: PropTypes.func.isRequired
}

export default AppHeader;
