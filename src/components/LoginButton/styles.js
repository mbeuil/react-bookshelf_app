import styled from '@emotion/styled/macro';
import {Dialog as ReachDialog} from '@reach/dialog';
import * as M from 'styles/media-queries';

export const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [M.small]: {
    width: '100%',
    margin: '10vh auto',
  },
});
