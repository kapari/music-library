import React from 'react';
import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';
import { transparentize } from 'polished';

export const List = styled.ul`
  transition: background-color 0.25s ease-in-out;
  max-width: 100%;
  min-height: 150px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 0;
  list-style-type: none;
  background-color: ${props => props.isDraggingOver ? transparentize('0.2', '#c64a01') : 'transparent'};
`;

function AlbumList({ id, direction, children }) {
  return (
    <Droppable droppableId={id} direction={direction ? direction : 'vertical'}>
      {(provided, snapshot) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

export default AlbumList;
