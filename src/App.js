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
  padding: 50px;
`;

const UnshelvedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

function App() {
  const initialColumnsState = {
    unshelved: {
      name: 'Unshelved Music',
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

    // If no destination, do nothing
    if (!destination) {
      return;
    }
    // If destination same as source, do nothing
    if (
      isSameList(source, destination) && 
      source.index === destination.index
    ) {
      return;
    }
    // Update source column orderedIds
    const newOrderedIds = Array.from(columns[source.droppableId].orderedIds);
    newOrderedIds.splice(source.index, 1);
    if (isSameList(source, destination)) {
      newOrderedIds.splice(destination.index, 0, draggableId);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          orderedIds: newOrderedIds
        }
      })
    } else {
      // TODO
    }
  })

  const unshelvedItems = columns['unshelved'].orderedIds.map((id, index) => {
    return (
      <AlbumItem
        key={id}
        index={index}
        info={allData[id]}
      />
    )
  })

  return (
    <Page>
      <Header />
      <Main>
        <div>
          <h2>Unshelved Music</h2>
          <DragDropContext
            onDragEnd={updateListContent}
          >
            <Droppable droppableId="unshelved">
              {(provided) => (
                <UnshelvedList 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  {unshelvedItems}
                  {provided.placeholder}
                </UnshelvedList>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Main>
    </Page>
  );
}

export default App;
