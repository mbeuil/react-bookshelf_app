import styled from '@emotion/styled/macro';
import {keyframes} from '@emotion/core';
import {FaSpinner} from 'react-icons/fa';
import * as C from './colors';

const buttonVariants = {
  primary: {
    background: C.indigo,
    color: C.base,
  },
  secondary: {
    background: C.gray,
    color: C.text,
  },
};

export const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'pimary'}) => buttonVariants[variant],
);

export const Input = styled.input({
  Radius: '3px',
  border: `1px solid ${C.gray10}`,
  background: C.gray,
  padding: '8px 12px',
});

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
});

export const LoadingSpinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
