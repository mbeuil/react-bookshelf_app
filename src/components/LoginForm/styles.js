import styled from '@emotion/styled/macro';
import * as C from 'styles/colors';

export const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: C.base,
  color: C.text,
  border: `1px solid ${C.gray10}`,
  cursor: 'pointer',
});

export const Form = styled.from({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '> div': {
    margin: '10px auto',
    width: '100%',
    maxWidth: '300px',
  },
});

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
