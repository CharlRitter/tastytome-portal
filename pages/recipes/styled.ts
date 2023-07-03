import { Paper, ToggleButton, styled } from '@mui/material';

export const LayoutToggleButton = styled(ToggleButton)(() => ({
  padding: '10px'
})) as typeof ToggleButton;

export const StickyHeader = styled(Paper)(() => ({
  marginBottom: '10px',
  padding: '5px',
  position: 'sticky',
  top: '99px',
  zIndex: 1051
})) as typeof Paper;
