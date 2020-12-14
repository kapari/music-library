import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../utils/colors';
import Button from './DragAndDropContainer/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

const Input = styled.input`
  transition: border-color .25s ease-in-out;
  margin-right: 5px;
  height: 30px;
  border: 1px solid ${theme.contentBorder};
  background-color: transparent;
  padding: 5px 10px;
  color: ${theme.headingText};

  &:hover,
  &:active,
  &:focus {
    border-color: ${theme.headingText};
  }
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
          <Input type="text" onChange={onChangeTempUser} value={tempUsername} />
        </label>
        <Button 
          type="submit" 
          onClick={(e) => onSubmit(e)} 
          faIcon={faArrowRight} 
          text="Load User"
          theme="secondary"
          disabled={tempUsername === username}
        />
      </form>
    </Header>
  );
}

AppHeader.propTypes = {
  username: PropTypes.string.isRequired,
  onSubmitUser: PropTypes.func.isRequired
}

export default AppHeader;
