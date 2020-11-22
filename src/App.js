import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from './components/Header';
import ShelfItem from './components/ShelfItem';
import AlbumList from './components/AlbumList';
import AlbumItem from './components/AlbumItem';
import styled from '@emotion/styled';

const Page = styled.div`
  min-height: 100vh;
  background-color: #333;
  color: white;
`;

const Main = styled.main`
  display: flex;
  padding: 50px;
`;

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

function App() {
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
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [allData, setAllData] = useState({});
  const [columns, setColumns] = useState(initialColumnsState);
  const [columnIds, setColumnIds] = useState(Object.keys(initialColumnsState))
  const [nextShelfId, setNextShelfId] = useState(2); // One default shelf

  // From API array to object with ids as keys
  const transformData = (dataArr) => {
    let dataObj = {};
    dataArr.forEach(item => {
      dataObj[item.id] = item.basic_information;
    });
    return dataObj;
  }

  // Get a page of data
  useEffect(() => {
    setError(false);
    fetch(`https://api.discogs.com/users/blacklight/collection/folders/0/releases?page=${currentPage}&per_page=50`, 
      {
        method: 'GET',
        headers: {
          'User-Agent': 'MusicLibraryDemoApp/1.0'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        const rawAlbumList = json.releases;
        const transformedData = transformData(rawAlbumList)
        setLastPage(json.pagination?.pages);
        setAllData(prevState => {
          return {
            ...prevState,
            ...transformedData
          };
        })
        const newUnshelved = {
          ...columns['unshelved'],
          orderedIds: rawAlbumList.map(item => item.id)
        }
        setColumns(prevState => {
          return {
            ...prevState,
            'unshelved': {
              ...newUnshelved
            }
          }
        })
        setIsLoaded(true);
      })
      .catch(error => {
        setError(true)
        console.log(`Something went wrong: ${error}`)
      });
  }, [currentPage])

  const updateListContent = useCallback((result) => {
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
  })

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
    const items = columns[columnId].orderedIds.map((albumId, index) => {
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

  return (
    <Page>
      <Header />
      <Main>
        {!isLoaded && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {isLoaded && (
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
        )}
      </Main>
    </Page>
  );
}

export default App;
