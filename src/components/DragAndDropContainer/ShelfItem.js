import React, { useState } from 'react';
import styled from '@emotion/styled';
import AlbumList from './AlbumList/AlbumList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Element = styled.li`
  margin-bottom: 10px;
  border: 1px solid #777;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.8);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #777;
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
  color: white;
  &:hover,
  &:active,
  &:focus {
    outline: none;
    border-bottom: 1px solid white;
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
    background-color: #444;
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

export default ShelfItem;
