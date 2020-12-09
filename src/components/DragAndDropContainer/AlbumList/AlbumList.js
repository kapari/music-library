import React from 'react';
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';
import { transparentize } from 'polished';
import theme from '../../../utils/colors';

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
  background-color: ${props => props.isDraggingOver ? transparentize('0.7', theme.primary) : 'transparent'};
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

AlbumList.propTypes = {
  id: PropTypes.string.isRequired,
  direction: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element)
}

export default AlbumList;
