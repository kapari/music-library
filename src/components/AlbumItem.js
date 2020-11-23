import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faTag, faCompactDisc, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const Element = styled.li`
  margin-bottom: 10px;
  max-width: 100%;
  width: 250px;
  border-radius: 5px;
  background-color: #444;
  padding: 5px 15px 15px;
`;

const Row = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`;

const TitleText = styled.span`
  margin-left: 0.5em;
`;

const DataHeading = styled.h4`
  display: inline-block;
  margin-top: 0;
  margin-bottom: 0.25em;
  margin-right: 0.5em;
`;

const DataList = styled.ul`
  display: inline;
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
          <Header>
            <Title>
              <FontAwesomeIcon icon={faMusic} />
              <TitleText>{info.title}</TitleText>
            </Title>
            <p>{info.year ? info.year : 'Unknown'}</p>
          </Header>
          <Row>
            <DataHeading>
              <FontAwesomeIcon icon={faMicrophoneAlt} fixedWidth />
              <span className="sr-only">Artists</span>
            </DataHeading>
            <DataList>{artists}</DataList>
          </Row>
          <Row>
            <DataHeading>
              <FontAwesomeIcon icon={faTag} fixedWidth />
              <span className="sr-only">Labels</span>
            </DataHeading>
            <DataList>{labels}</DataList>
          </Row>
          <Row>
            <DataHeading>
              <FontAwesomeIcon icon={faCompactDisc} fixedWidth />
              <span className="sr-only">Formats</span>
            </DataHeading>
            <DataList>{formats}</DataList>
          </Row>
        </Element>
      )}
    </Draggable>
  );
}

export default AlbumItem;
