import { Accordion, Box, Paper, ToggleButton, styled } from '@mui/material';
import { StyledProps } from '@/types/common';

export const LayoutToggleButton = styled(ToggleButton)(() => ({
  padding: '10px'
})) as typeof ToggleButton;

export const StickyWrapper = styled(Box)<StyledProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginBottom: '10px',
  marginTop: '-39px',
  paddingTop: '25px',
  position: 'sticky',
  top: '60px',
  zIndex: 1051
})) as typeof Box;

export const ActionsHeader = styled(Paper)(() => ({
  padding: '5px'
})) as typeof Paper;

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
