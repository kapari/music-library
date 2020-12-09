import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AlbumList from './AlbumList/AlbumList';
import theme from '../../utils/colors';

const Shelf = styled.div`
  margin-bottom: 10px;
  border: 1px solid ${theme.contentBorder};
  border-radius: 5px;
  background-color: ${theme.contentBg};
  padding-bottom: 10px;
  color: ${theme.headingText};
`;

const Header = styled.header`
  padding: 15px 10px;
  border-bottom: 1px solid ${theme.contentBorder};
`;

const Heading = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 1;
`;

const AlbumCount = styled.p`
  margin: 0;
`;

function Unshelved({ albumsLoadedCount, totalAlbumCount, albumElts }) {
  return (
    <Shelf>
      <Header>
        <Heading>Unshelved Music</Heading>
        <AlbumCount>
          Loaded {albumsLoadedCount} of {totalAlbumCount} albums
        </AlbumCount>
      </Header>
      <AlbumList id="unshelved" direction="vertical">
        {albumElts}
      </AlbumList>
    </Shelf>
  );
}

Unshelved.propTypes = {
  albumsLoadedCount: PropTypes.number.isRequired,
  totalAlbumCount: PropTypes.number.isRequired,
  albumElts: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Unshelved;
