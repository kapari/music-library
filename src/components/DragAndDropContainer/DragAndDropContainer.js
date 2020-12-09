import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import Unshelved from './Unshelved';
import ShelfItem from './ShelfItem';
import AlbumItem from './AlbumList/AlbumItem';
import Button from './Button';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';

const Column = styled.section`
  width: calc(100% - 310px);
  flex: 0 1 auto;
  &:first-of-type {
    flex: 0 1 310px;
    padding-right: 30px;
  }
`;

const ShelfList = styled.ul`
  max-width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

function DragAndDropContainer({ 
  allData, 
  newPageData,
  onLoadPage, 
  hasLoadedAllPages,
  totalAlbumCount
}) {
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
    const newIds = Object.keys(newPageData).map(item => item);
    setColumns(prevState => {
      const newUnshelvedIds = prevState['unshelved'].orderedIds.concat(newIds)
      return {
        ...prevState,
        'unshelved': {
          ...prevState['unshelved'],
          orderedIds: newUnshelvedIds
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

  const onAddShelf = (e) => {
    const newShelfId = `shelf${nextShelfId}`;
    setColumns(prevState => {
      return {
        ...prevState,
        [newShelfId]: {
          key: newShelfId,
          name: 'My New Shelf',
          orderedIds: []
        }
      }
    });
    setNextShelfId(prevState => prevState + 1);
  }

  const onDeleteShelf = (id) => {
    const message = "Any albums on this shelf will be returned to the Unshelved column. Do you still want to delete this shelf?"
    const confirmDelete = window.confirm(message)
    if (confirmDelete) {
      setColumns(prevState => {
        const albumsInColumn = columns[id].orderedIds;
        let columnsCopy = {...prevState};
        delete columnsCopy[id];
        const unshelvedAlbumsCopy = [...columnsCopy['unshelved'].orderedIds]
        const allUnshelvedAlbums = albumsInColumn.concat(unshelvedAlbumsCopy);
        return {
          ...columnsCopy,
          'unshelved': {
            ...columnsCopy['unshelved'],
            orderedIds: allUnshelvedAlbums
          }
        }
      });
    }
  }

  const getAlbumItems = ({columnId, isHorizontal = false}) => {
    const items = columns[columnId].orderedIds.map((albumId, index) => {
      return (
        <AlbumItem
          key={albumId}
          index={index}
          info={allData[albumId]}
          horizontal={isHorizontal}
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
        <Unshelved 
          albumsLoadedCount={Object.keys(allData).length}
          totalAlbumCount={totalAlbumCount}
          albumElts={getAlbumItems({ columnId: 'unshelved' })}
        />
        <Button 
          faIcon={faDownload}
          text={"Load More Albums"}
          onClick={onLoadPage} 
          disabled={hasLoadedAllPages}
        />
      </Column>
      <Column>
        {Object.keys(columns).length === 1 ? (
          <p>Please add a shelf</p>
        ) : (
          <ShelfList>
            {Object.keys(columns).map(columnId => {
              return columnId !== 'unshelved' ? (
                <ShelfItem
                  key={columnId}
                  id={columnId}
                  onDeleteShelf={onDeleteShelf}
                  albumElts={getAlbumItems({ columnId, isHorizontal: true })}
                />  
              ) : null
            })}
          </ShelfList>
        )}
        <Button faIcon={faPlus} text={"Add a Shelf"} onClick={onAddShelf} />
      </Column>
    </DragDropContext>
  );
}

DragAndDropContainer.propTypes = {
  allData: PropTypes.object.isRequired,
  newPageData: PropTypes.object.isRequired,
  onLoadPage: PropTypes.func.isRequired,
  hasLoadedAllPages: PropTypes.bool.isRequired,
  totalAlbumCount: PropTypes.number.isRequired
}

export default DragAndDropContainer;
