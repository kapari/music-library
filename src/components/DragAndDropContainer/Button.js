import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Element = styled.button`
  transition: all 0.25s ease-in-out;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #c64a01;
  padding: 10px 20px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background-color: white;
    color: black;
  }

  .svg-inline--fa {
    margin-right: 5px;
  }
`;

function Button({ faIcon, text, ...otherAttrs}) {
  return (
    <Element type="button" {...otherAttrs}>
      <FontAwesomeIcon icon={faIcon} role="presentation" aria-hidden="true" />
      <span>{text}</span>
    </Element>
  );
}

export default Button;
