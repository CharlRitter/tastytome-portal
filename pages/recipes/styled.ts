import { ToggleButton, styled } from '@mui/material';

export const LayoutToggleButton = styled(ToggleButton)(() => ({
  padding: '10px'
}));

export const StickyHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '5px 0',
  position: 'sticky',
  top: '64px',
  zIndex: 1051,
}));
