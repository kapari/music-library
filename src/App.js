import React, { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import DragAndDropContainer from './components/DragAndDropContainer/DragAndDropContainer';
import styled from '@emotion/styled';

const Page = styled.div`
  min-height: 100vh;
  background-color: #333;
  color: white;
  &:before {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: 
      linear-gradient(to top, black, transparent), 
      url('https://loremflickr.com/g/1920/1200/music,record/all');
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Main = styled.main`
  position: relative;
  display: flex;
  padding: 50px;
`;

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [totalAlbums, setTotalAlbums] = useState(0)
  const [newPageData, setNewPageData] = useState({});
  const [allData, setAllData] = useState({});
  const [username, setUsername] = useState('blacklight');

  // From API array to object with ids as keys
  const transformData = (dataArr) => {
    let dataObj = {};
    dataArr.forEach(item => {
      dataObj[item.id] = item.basic_information;
    });
    return dataObj;
  }

  const onSubmitUser = (newUsername) => {
    setUsername(prevState => {
      if (prevState !== newUsername) {
        resetDataForNewUser();
      }
      return newUsername;
    });
    setUsername(newUsername)
  };

  const updateDataOnNewPageLoad = useCallback((json) => {
    const transformedData = transformData(json.releases)
    setLastPage(json.pagination?.pages);
    setTotalAlbums(json.pagination?.items);
    setNewPageData(transformedData);
    setAllData(prevState => {
      return {
        ...prevState,
        ...transformedData
      };
    })
  }, []);

  const resetDataForNewUser = () => {
    setCurrentPage(1);
    setLastPage(0);
    setTotalAlbums(0);
    setNewPageData({});
    setAllData({})
  }
  
  // Get a page of data
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    fetch(`https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${currentPage}&per_page=20`, 
      {
        method: 'GET',
        headers: {
          'User-Agent': 'MusicLibraryDemoApp/1.0'
        }
      }
    )
      .then(response => response.json())
      .then(json => {
        updateDataOnNewPageLoad(json);
        setIsLoaded(true);
      })
      .catch(error => {
        setError(true)
        console.log(`Something went wrong: ${error}`)
      });
  }, [username, currentPage, updateDataOnNewPageLoad])

  return (
    <Page>
      <Header username={username} onSubmitUser={onSubmitUser} />
      <Main>
        {!isLoaded && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {isLoaded && (
          <ErrorBoundary>
            <DragAndDropContainer 
              allData={allData} 
              newPageData={newPageData} 
              hasLoadedAllPages={currentPage === lastPage} 
              onLoadPage={() => setCurrentPage(prevState => prevState + 1)}
              totalAlbumCount={totalAlbums}
            />
          </ErrorBoundary>
        )}
      </Main>
    </Page>
  );
}

export default App;
