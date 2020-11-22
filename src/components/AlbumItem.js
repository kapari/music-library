import React from 'react';
import styled from '@emotion/styled';

const Element = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const DataHeading = styled.h4`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0.25em;
`;

const DataList = styled.ul`
  margin-left: 0;
  margin-bottom: 0.25em;
  padding: 0;
  list-style-type: none;
`;

const DataItem = styled.li`
  display: inline;
  &:nth-of-type(n + 2) {
    &:before {
      content: ', '
    }
  }
`;

function AlbumItem({info}) {
  const artists = info.artists.map(item => {
    return <DataItem>{item.name}</DataItem>
  })
  const formats = info.formats.map(item => {
    return <DataItem>{item.name}</DataItem>
  })
  const labels = info.labels.map(item => {
    return <DataItem>{item.name}</DataItem>
  })

  return (
    <Element>
      <Title>{info.title}</Title>
      <p>{info.year ? info.year : 'Unknown'}</p>
      <DataHeading>Artists</DataHeading>
      <DataList>{artists}</DataList>
      <DataHeading>Labels</DataHeading>
      <DataList>{labels}</DataList>
      <DataHeading>Formats</DataHeading>
      <DataList>{formats}</DataList>
    </Element>
  );
}

export default AlbumItem;
