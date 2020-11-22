import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from './components/Header';
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
  min-height: 100px; // has drop area even when empty
`;

function App() {
  const initialColumnsState = {
    unshelved: {
      name: 'Unshelved Music',
      orderedIds: []
    },
    column1: {
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

  // From API array to object with ids as keys
  const transformData = (dataArr) => {
    console.log('dataArr', dataArr)
    let dataObj = {};
    dataArr.forEach(item => {
      dataObj[item.id] = item.basic_information;
    });
    console.log('dataObj', dataObj)
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

  const isSameList = (source, destination) => {
    return source.droppableId === destination.droppableId
  }

  const updateListContent = useCallback((result) => {
    // Update list order
    const { draggableId, source, destination } = result;
    const startListId = source.droppableId;
    const startListIndex = source.index;
    const endListId = destination?.droppableId;
    const endListIndex = destination?.index;

    // If no destination, or if destination same as source, do nothing
    if (!destination || (
      isSameList(source, destination) &&
      source.index === destination.index
    )) {
      return;
    }

    // Update column orderedIds
    const newStartIds = Array.from(columns[startListId].orderedIds);
    newStartIds.splice(startListIndex, 1); 

    if (isSameList(source, destination)) {
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

  const getAlbumItems = (columnId) => {
    const items = columns[columnId].orderedIds.map((id, index) => {
      return (
        <AlbumItem
          key={id}
          index={index}
          info={allData[id]}
        />
      )
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
                  <ShelfList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {getAlbumItems('unshelved')}
                    {provided.placeholder}
                  </ShelfList>
                )}
              </Droppable>
            </Column>
            <Column>
              <div>
                <h2>My New Shelf</h2>
                <Droppable droppableId='column1'>
                  {(provided) => (
                    <ShelfList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {getAlbumItems('column1')}
                      {provided.placeholder}
                    </ShelfList>
                  )}
                </Droppable>
              </div>
            </Column>
          </DragDropContext>
        )}
      </Main>
    </Page>
  );
}

export default App;
