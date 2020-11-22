import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const Element = styled.li`
  margin-bottom: 10px;
  border: 1px solid #ccc;
  background-color: #444;
  padding: 10px;
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

function AlbumItem({info, index}) {
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
    <Draggable
      key={info.id}
      draggableId={info.id.toString()} 
      index={index}
    >
      {provided => (
        <Element
          key={info.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{info.title}</Title>
          <p>{info.year ? info.year : 'Unknown'}</p>
          <DataHeading>Artists</DataHeading>
          <DataList>{artists}</DataList>
          <DataHeading>Labels</DataHeading>
          <DataList>{labels}</DataList>
          <DataHeading>Formats</DataHeading>
          <DataList>{formats}</DataList>
        </Element>
      )}
    </Draggable>
  );
}

export default AlbumItem;
