import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import AlbumList from './AlbumList.js';

const Element = styled.li`
  margin-bottom: 10px;
  border: 1px solid #777;
`;

const Header = styled.header`
  display: flex;
  border-bottom: 1px solid #777;
  padding: 10px;
`;

const Heading = styled.h2`
  margin: 0;
  overflow: hidden;
  width: 0;
  height: 0;
  opacity: 0;
`;

const Content = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

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

function ShelfItem({ id, children }) {
  const [name, setName] = useState('My New Shelf');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <Element key={id}>
      <Header>
        <label>
          <Heading>{name}</Heading>
          <SecretInput type="text" value={name} onChange={handleNameChange} />
        </label>
      </Header>
      <Content>
        <Droppable droppableId={id} direction="horizontal">
          {(provided) => (
            <AlbumList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {children}
              {provided.placeholder}
            </AlbumList>
          )}
        </Droppable>
      </Content>
    </Element>
  );
}

export default ShelfItem;
