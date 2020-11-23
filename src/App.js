import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import DragAndDropContainer from './components/DragAndDropContainer';
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

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [newPageData, setNewPageData] = useState({});
  const [allData, setAllData] = useState({});

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
        setNewPageData(transformedData);
        setAllData(prevState => {
          return {
            ...prevState,
            ...transformedData
          };
        })
        setIsLoaded(true);
      })
      .catch(error => {
        setError(true)
        console.log(`Something went wrong: ${error}`)
      });
  }, [currentPage])

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
          <ErrorBoundary>
            <DragAndDropContainer allData={allData} newPageData={newPageData} />
          </ErrorBoundary>
        )}
      </Main>
    </Page>
  );
}

export default App;
