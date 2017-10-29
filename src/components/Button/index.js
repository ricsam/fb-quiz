import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button as BSButton} from 'reactstrap';

const ButtonBase = styled(BSButton)`
  font-size: 1rem;
  background-color: #1e1e1e;
  padding: 0.375em 0.75em;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  border: 1px solid transparent;
  box-sizing: border-box;
  span {
    font-family: Oswald;
    font-size: 1em;
    font-weight: 200;
    color: #fff;
  }
  &:focus {
    border-color: transparent !important;
    outline: none;
  }
`;

export default function Button(_props) {
  const props = {..._props};
  const children = props.children;
  delete props.children;

  return (
    <ButtonBase {...props}><span>{children}</span></ButtonBase>
  );
}

Button.propTypes = {
  children: PropTypes.any
};