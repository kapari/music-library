import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Unshelved from './Unshelved';
import ShelfItem from './ShelfItem';
import AlbumList from './AlbumList/AlbumList';
import AlbumItem from './AlbumList/AlbumItem';
// Modified React Sortable HOC to drop to multiple lists
// https://github.com/clauderic/react-sortable-hoc/pull/138#issuecomment-509514762
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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
      orderedIds: [35126, 62155]
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

  const onSortEnd = (options, e) => {
    console.log("onSortEnd", options, e)
  }

  // const updateListContent = (result) => {
  //   const { draggableId, source, destination } = result;
  //   const startListId = source.droppableId;
  //   const startListIndex = source.index;
  //   const endListId = destination?.droppableId;
  //   const endListIndex = destination?.index;

  //   // If no destination, or if destination same as source, do nothing
  //   if (!destination || (
  //     (startListId === endListId) &&
  //     source.index === destination.index
  //   )) {
  //     return;
  //   }

  //   // Update column orderedIds
  //   const newStartIds = Array.from(columns[startListId].orderedIds);
  //   newStartIds.splice(startListIndex, 1);

  //   if (startListId === endListId) {
  //     newStartIds.splice(endListIndex, 0, draggableId);
  //     setColumns({
  //       ...columns,
  //       [startListId]: {
  //         ...columns[startListId],
  //         orderedIds: newStartIds
  //       }
  //     })
  //   } else {
  //     const newEndIds = Array.from(columns[endListId].orderedIds);
  //     newEndIds.splice(endListIndex, 0, draggableId);
  //     setColumns({
  //       ...columns,
  //       [startListId]: {
  //         ...columns[startListId],
  //         orderedIds: newStartIds
  //       },
  //       [endListId]: {
  //         ...columns[endListId],
  //         orderedIds: newEndIds
  //       }
  //     })
  //   }
  // }

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

  const ListOfSortableItems = ({id}) => {
    return (
      <AlbumList id={id} key={id} role="list">
        {columns[id].orderedIds.map((albumId, index) => {
          return (
            <SortableItem 
              key={albumId} 
              index={index} 
              info={allData[albumId]}
              tabIndex={0}
            />
          )
        })}
      </AlbumList>
    )
  }

  const SortableItem = SortableElement(({info}) => <AlbumItem info={info} />)

  const SortableGroup = SortableContainer(({
    columns,
    allData,
    hasUserShelves
  }) => {
    return (
      <>
        <Column>
          <Unshelved
            albumsLoadedCount={Object.keys(allData).length}
            totalAlbumCount={totalAlbumCount}
          >
            <ListOfSortableItems id='unshelved' />
          </Unshelved>
          <button
            type="button"
            onClick={onLoadPage}
            disabled={hasLoadedAllPages}
          >
            Load More Albums
          </button>
        </Column>
        <Column>
          <ShelfList>
            {!hasUserShelves ? (
              <p>Please add a shelf</p>
            ) : (
                Object.keys(columns).map(columnId => {
                  return columnId !== 'unshelved' ? (
                    <ShelfItem
                      key={columnId}
                      id={columnId}
                      onDeleteShelf={onDeleteShelf}
                    >
                      {console.log("shelfId: ", columnId)}
                      <ListOfSortableItems id={columnId} />
                    </ShelfItem>
                  ) : null
                })
              )}
          </ShelfList>
          <button type="button" onClick={onAddShelf}>Add Shelf</button>
        </Column>
      </>
    )
  })

  // const SortableList = SortableContainer(({columnId}) => {
  //   return (
  //     <AlbumList>
  //       {columns[columnId].orderedIds.map((albumId, index) => {
  //         return (
  //           <SortableItem key={albumId} index={index} info={allData[albumId]} />
  //         )
  //       })}
  //     </AlbumList>
  //   )
  // })

  return (
    <SortableGroup
      columns={columns}
      allData={allData}
      hasUserShelves={Object.keys(columns).length > 1}
      onSortEnd={onSortEnd}
      axis='xy'
    />
  );
}

export default DragAndDropContainer;
