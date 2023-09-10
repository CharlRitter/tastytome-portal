import { Accordion, Box, Stack, styled } from '@mui/material';
import { StyledProps } from '@/types/common';

export const StickyWrapper = styled(Box)<StyledProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginBottom: '10px',
  marginTop: '-39px',
  paddingTop: '25px',
  position: 'sticky',
  top: '60px',
  zIndex: 1051
})) as typeof Box;

export const ActionsAccordion = styled(Accordion)(() => ({
  '&::before': {
    display: 'none'
  },

  '.MuiAccordionSummary-content': {
    alignItems: 'center'
  },

  '.MuiAccordionDetails-root': {
    padding: 0
  }
})) as typeof Accordion;

export const RatingStack = styled(Stack)<StyledProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '9px'
})) as typeof Stack;

export const DropzoneBox = styled(Box)<StyledProps>(({ theme, isMediumScreen }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '15px',
  minWidth: isMediumScreen ? 'unset' : '403px'
}));

export const DropBox = styled(Box)<StyledProps>(({ theme, disabled, isDragActive }) => ({
  border: `1px solid ${isDragActive ? theme.palette.action.active : 'transparent'}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '9px',
  opacity: disabled ? 0.7 : 1,
  backgroundColor: isDragActive ? theme.palette.action.hover : 'inherit'
}));
