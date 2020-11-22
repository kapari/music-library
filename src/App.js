import React, { useState, useEffect } from 'react';
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

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState([]);
  const [lastPage, setLastPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
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
        setCollection(json.releases);
        setLastPage(json.pagination?.pages);
        setTotalItems(json.pagination?.items);
        setIsLoaded(true);
      }, (error) => {
        console.log(error)
      })
      .catch(error => console.log(`Something went wrong: ${error}`));
  }, [currentPage])

  const currentItems = collection.map((item) => {
    return (<AlbumItem key={item.id} info={item.basic_information} />)
  })

  return (
    <Page>
      <Header />
      <Main>
        <div>
          <h2>Unshelved Music</h2>
          <ul>
            { currentItems }
          </ul>
        </div>
      </Main>
    </Page>
  );
}

export default App;
