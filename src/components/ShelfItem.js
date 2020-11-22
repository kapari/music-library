import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import AlbumList from './AlbumList.js';

const Element = styled.li`
  margin-bottom: 10px;
  border: 1px solid #ccc;
  background-color: #444;
  padding: 10px;
`;

function ShelfItem({ id, children }) {
  return (
    <Element key={id}>
      <h2>My New Shelf</h2>
      <Droppable droppableId={id}>
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
    </Element>
  );
}

export default ShelfItem;
