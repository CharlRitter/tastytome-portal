import { Accordion, Box, Stack, styled } from '@mui/material';

export const StickyWrapper = styled(Box)(({ theme }) => ({
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

export const RatingStack = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '9px'
})) as typeof Stack;

export const DropzoneBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '15px'
})) as typeof Box;

export const DropBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderRadius: '5px',
  padding: '9px'
})) as typeof Box;

export const LoadingStack = styled(Stack)(() => ({
  height: '85vh'
})) as typeof Stack;
