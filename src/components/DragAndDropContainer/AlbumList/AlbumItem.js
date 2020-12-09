import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCompactDisc, 
  faMicrophoneAlt, 
  faMusic, 
  faTag
} from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import theme from './../../../utils/colors';

const Element = styled.li`
  transition: box-shadow 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
  max-width: 100%;
  width: 250px;
  border-radius: 5px;
  background-color: ${theme.cardBg};
  color: ${theme.cardText};
  padding: 15px;
  box-shadow: ${props => props.isDragging ? `0 5px 10px ${transparentize(0.5, 'black')}` : '0 5px 10px transparent'};

  ${props => props.isHorizontal ? {
    display: 'inline-block',
    verticalAlign: 'top'
  } : null}

  &::before {
    content: '';
    transition: background-color 0.25s ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${props => props.isDragging ? theme.primary : 'transparent'};
  }

  &:hover,
  &:active,
  &:focus {
    &::before {
      background-color: ${theme.primary};
    }
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Title = styled.h3`
  flex: 1 1 auto;
  display: flex;
  max-width: 100%;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 0.5em;
  line-height: 1.2;
  .fa-music {
    transform: translateY(2px);
  }
`;

const TitleText = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.5em;
`;

const Year = styled.p`
  justify-self: flex-end;
  margin: 0;
  padding-left: 5px;
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

function AlbumItem({info, index, isHorizontal}) {
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
      {(provided, snapshot) => (
        <Element
          key={info.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isHorizontal={isHorizontal}
          isDragging={snapshot.isDragging}
        >
          <Row as="header">
            <Title>
              <FontAwesomeIcon icon={faMusic} />
              <TitleText>{info.title}</TitleText>
            </Title>
            <Year>{info.year ? info.year : 'Unknown'}</Year>
          </Row>
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

AlbumItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    artists: PropTypes.array.isRequired,
    formats: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isHorizontal: PropTypes.bool
}

export default AlbumItem;
