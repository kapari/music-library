import React from 'react';
import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';

export const List = styled.ul`
  max-width: 100%;
  min-height: 150px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 10px 0 10px 10px;
  list-style-type: none;
`;

function AlbumList({ id, direction, children }) {
  return (
    <Droppable droppableId={id} direction={direction ? direction : 'vertical'}>
      {(provided) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

export default AlbumList;
