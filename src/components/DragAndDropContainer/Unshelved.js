import React from 'react';
import styled from '@emotion/styled';

const Shelf = styled.div`
  margin-bottom: 10px;
  border: 1px solid #777;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  padding-bottom: 10px;
`;

const UnshelvedHeader = styled.header`
  padding: 15px 10px;
  border-bottom: 1px solid #777;
`;

const UnshelvedHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 1;
`;

const AlbumCount = styled.p`
  margin: 0;
`;

function Unshelved({ albumsLoadedCount, totalAlbumCount, children }) {
  return (
    <Shelf>
      <UnshelvedHeader>
        <UnshelvedHeading>Unshelved Music</UnshelvedHeading>
        <AlbumCount>
          Loaded {albumsLoadedCount} of {totalAlbumCount} albums
        </AlbumCount>
      </UnshelvedHeader>
      {children}
    </Shelf>
  );
}

export default Unshelved;
