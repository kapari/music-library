import React from 'react';
import styled from '@emotion/styled';

const Element = styled.li`
  padding: 10px;
`;

function AlbumItem({info}) {
  const artists = info.artists.map(item => {
    return <li>{item.name}</li>
  })
  const formats = info.formats.map(item => {
    return <li>{item.name}</li>
  })
  const labels = info.labels.map(item => {
    return <li>{item.name}</li>
  })

  return (
    <Element>
      <h3>{info.title}</h3>
      <p>{info.year}</p>
      <h4>Artists</h4>
      <ul>{artists}</ul>
      <h4>Labels</h4>
      <ul>{labels}</ul>
      <h4>Formats</h4>
      <ul>{formats}</ul>
    </Element>
  );
}

export default AlbumItem;
