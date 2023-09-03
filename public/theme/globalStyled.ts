import Link from 'next/link';
import { styled } from '@mui/system';
import { Rating } from '@mui/material';
import { StyledProps } from '@/types/common';

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

export const StyledRating = styled(Rating)<StyledProps>(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main
  },
})) as typeof Rating;

export const EffortRating = styled(Rating)<StyledProps>(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.secondary.main
  },
})) as typeof Rating;
