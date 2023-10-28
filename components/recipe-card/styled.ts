import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material';

export const RecipeSpeedDial = styled(SpeedDial)(() => ({
  '.MuiSpeedDial-fab': {
    boxShadow: 'unset',
    width: '40px',
    height: '40px'
  }
})) as typeof SpeedDial;

export const RecipeSpeedDialIcon = styled(SpeedDialIcon)(() => ({
  height: '20px',

  '.MuiSpeedDialIcon-icon': {
    height: '20px',
    transition: 'transform 0.5s ease'
  },

  '.MuiSpeedDialIcon-iconOpen': {
    transform: 'rotate(180deg)',
    transition: 'transform 0.5s ease'
  }
}));

export const RecipeSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,

  '&:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
})) as typeof SpeedDialAction;
