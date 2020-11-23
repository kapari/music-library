import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import ShelfItem from './ShelfItem';
import AlbumList from './AlbumList.js';
import AlbumItem from './AlbumItem.js';

const Column = styled.section`
  flex: 1 1 auto;
  &:first-of-type {
    max-width: 40%;
    padding-right: 30px;
  }
`;

const ShelfList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

function DragAndDropContainer({ allData, newPageData }) {
  const initialColumnsState = {
    unshelved: {
      key: 'unshelved',
      name: 'Unshelved Music',
      orderedIds: []
    },
    shelf1: {
      key: 'shelf1',
      name: 'My New Shelf',
      orderedIds: []
    }
  }
  const [columns, setColumns] = useState(initialColumnsState);
  const [nextShelfId, setNextShelfId] = useState(2); // One default shelf

  // Add newly fetched data ids to unshelved column
  useEffect(() => {
    setColumns(prevState => {
      const newUnshelved = {
        ...prevState['unshelved'],
        orderedIds: Object.keys(newPageData).map(item => item)
      }
      return {
        ...prevState,
        'unshelved': {
          ...newUnshelved
        }
      }
    })
  }, [newPageData]);


  const updateListContent = (result) => {
    const { draggableId, source, destination } = result;
    const startListId = source.droppableId;
    const startListIndex = source.index;
    const endListId = destination?.droppableId;
    const endListIndex = destination?.index;

    // If no destination, or if destination same as source, do nothing
    if (!destination || (
      (startListId === endListId) &&
      source.index === destination.index
    )) {
      return;
    }

    // Update column orderedIds
    const newStartIds = Array.from(columns[startListId].orderedIds);
    newStartIds.splice(startListIndex, 1);

    if (startListId === endListId) {
      newStartIds.splice(endListIndex, 0, draggableId);
      setColumns({
        ...columns,
        [startListId]: {
          ...columns[startListId],
          orderedIds: newStartIds
        }
      })
    } else {
      const newEndIds = Array.from(columns[endListId].orderedIds);
      newEndIds.splice(endListIndex, 0, draggableId);
      setColumns({
        ...columns,
        [startListId]: {
          ...columns[startListId],
          orderedIds: newStartIds
        },
        [endListId]: {
          ...columns[endListId],
          orderedIds: newEndIds
        }
      })
    }
  }

  const getShelfItems = () => {
    const items = Object.keys(columns).map(columnId => {
      return columnId !== 'unshelved' ? (
        <ShelfItem
          key={columnId}
          id={columnId}
        >
          {getAlbumItems(columnId)}
        </ShelfItem>
      ) : null
    });
    return items;
  }

  const addShelf = (e) => {
    const newShelfId = `shelf${nextShelfId}`;
    setColumns(prevState => {
      return {
        ...prevState,
        [newShelfId]: {
          id: newShelfId,
          name: 'My New Shelf',
          orderedIds: []
        }
      }
    });
    setNextShelfId(prevState => prevState + 1);
  }

  const getAlbumItems = (columnId) => {
    console.log(columns)
    const items = columns[columnId].orderedIds.map((albumId, index) => {
      console.log('album id:', albumId)
      return (
        <AlbumItem
          key={albumId}
          index={index}
          info={allData[albumId]}
        />
      )
    });
    return items;
  }

  return (
    <DragDropContext
      onDragEnd={updateListContent}
    >
      <Column>
        <h2>Unshelved Music</h2>
        <Droppable droppableId='unshelved'>
          {(provided) => (
            <AlbumList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {getAlbumItems('unshelved')}
              {provided.placeholder}
            </AlbumList>
          )}
        </Droppable>
      </Column>
      <Column>
        <ShelfList>
          {getShelfItems()}
        </ShelfList>
        <button type="button" onClick={addShelf}>Add Shelf</button>
      </Column>
    </DragDropContext>
  );
}

export default DragAndDropContainer;
