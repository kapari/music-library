import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AlbumList from './AlbumList/AlbumList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import theme from '../../utils/colors';

const Element = styled.li`
  margin-bottom: 10px;
  border: 1px solid ${theme.contentBorder};
  border-radius: 5px;
  background-color: ${theme.contentBg};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.contentBorder};
  padding: 10px;
`;

const Heading = styled.h2``;

const Content = styled.div``;

const SecretInput = styled.input`
  transition: border-bottom 0.25s ease-in-out;
  height: 40px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  font-size: 20px;
  color: ${theme.headingText};
  &:hover,
  &:active,
  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.headingText};
  }
`;

const DeleteButton = styled.button`
  transition: background-color 0.25s ease-in-out;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  padding: 0 20px;
  color: inherit;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background-color: ${theme.iconBtnHover};
  }
`;

function ShelfItem({ id, onDeleteShelf, albumElts }) {
  const [name, setName] = useState('My New Shelf');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <Element key={id}>
      <Header>
        <label>
          <Heading className="sr-only">{name}</Heading>
          <SecretInput type="text" value={name} onChange={handleNameChange} />
        </label>
        <DeleteButton type="button" onClick={() => onDeleteShelf(id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
          <span className="sr-only">Delete Shelf</span>
        </DeleteButton>
      </Header>
      <Content>
        <AlbumList id={id} direction="horizontal">
          {albumElts}
        </AlbumList>
      </Content>
    </Element>
  );
}

ShelfItem.propTypes = {
  id: PropTypes.string.isRequired,
  onDeleteShelf: PropTypes.func.isRequired,
  albumElts: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default ShelfItem;
