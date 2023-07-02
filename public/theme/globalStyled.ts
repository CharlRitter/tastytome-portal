import Link from 'next/link';
import { styled } from '@mui/system';

export const NextLink = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
  fontWeight: '400',
  whiteSpace: 'nowrap',

  '&:hover': {
    textDecoration: 'underline'
  },

  '&:focus': {
    outline: 'none'
  },

  '&:active': {
    color: 'inherit'
  }
}));
