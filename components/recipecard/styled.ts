import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material';

export const RecipeSpeedDial = styled(SpeedDial)(() => ({
  position: 'absolute',

  '.MuiSpeedDial-fab': {
    width: '40px',
    height: '40px'
  }
}));

export const RecipeSpeedDialIcon = styled(SpeedDialIcon)(() => ({
  height: '20px',

  '.MuiSpeedDialIcon-icon': {
    height: '20px'
  },

  '.MuiSpeedDialIcon-openIconOpen': {
    height: '20px',
    left: '10px',
    transform: 'rotate(45deg)',
    width: '20px'
  }
}));

export const RecipeSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
}));

export const RecipeSpeedDialWrapper = styled(Box)(() => ({
  height: '48px',
  width: '48px'
}));
