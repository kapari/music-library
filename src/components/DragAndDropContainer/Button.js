import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../utils/colors';

const Element = styled.button`
  transition: all 0.25s ease-in-out;
  border: 1px solid ${theme.primaryText};
  border-radius: 5px;
  background-color: ${props => props.theme === 'primary' ? theme.primary : theme.secondary};
  padding: 10px 20px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme === 'primary' ? theme.primaryText : theme.secondaryText};
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    background-color: ${props => props.theme === 'primary' ? theme.primaryText : theme.secondaryText};
    color: ${props => props.theme === 'primary' ? theme.primary : theme.secondary};
  }

  &:disabled {
    border-color: ${theme.disabledBtn};
    background-color: ${theme.disabledBtn};
    color: ${theme.disabledBtnText};
    cursor: default;
    pointer-events: none;
    > * {
      opacity: 0.7;
    }
  }

  .svg-inline--fa {
    margin-right: 5px;
  }
`;

function Button({ faIcon, text, theme = 'primary', disabled = false, ...otherAttrs}) {
  return (
    <Element type="button" theme={theme} disabled={disabled} {...otherAttrs}>
      <FontAwesomeIcon icon={faIcon} role="presentation" aria-hidden="true" />
      <span>{text}</span>
    </Element>
  );
}

Button.propTypes = {
  faIcon: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(['primary', 'secondary'])
}

export default Button;
