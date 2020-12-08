import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../utils/colors';

const Element = styled.button`
  transition: all 0.25s ease-in-out;
  border: 1px solid ${theme.primaryText};
  border-radius: 5px;
  background-color: ${theme.primary};
  padding: 10px 20px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.primaryText};
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background-color: ${theme.primaryText};
    color: ${theme.primary};
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
