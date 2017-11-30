import styled, { css, keyframes } from 'styled-components';
import styledButton from 'components/Button';

export const Button = styled(styledButton)`
  display: flex;
  ${(props) => props.disabled && 'cursor: auto;'}
  ${(props) => props.disabled && !props.loading && 'opacity: 0.3;'}
`;

export const CircleSpinner = styled.div`
  width: 1em;
  height: 1em;
  position: relative;
  max-height: 1.2em;
  align-self: flex-end;
`;


/* eslint-disable no-mixed-operators */
const transform = css`
  -webkit-transform: rotate(${({ i }) => i * 30}deg);
  -ms-transform: rotate(${({ i }) => i * 30}deg);
  transform: rotate(${({ i }) => i * 30}deg);
  :before {
    -webkit-animation-delay: -${({ i }) => 1.2 - 0.1 * i}s;
    animation-delay: -${({ i }) => 1.2 - 0.1 * i}s;
  }
`;
/* eslint-enable no-mixed-operators */


const circleFadeDelay = keyframes`
  0%,
  39%,
  100% {
    opacity: 0; }
  40% {
    opacity: 1; }
`;


export const Circle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  :before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: #ccc;
    border-radius: 100%;
    -webkit-animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
    animation: ${circleFadeDelay} 1.2s infinite ease-in-out both;
  }
  ${transform}
`;
