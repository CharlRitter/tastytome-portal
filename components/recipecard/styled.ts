import { CardActions, SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material';
import { StyledProps } from '@/types/common';

export const RecipeSpeedDial = styled(SpeedDial)(() => ({
  '.MuiSpeedDial-fab': {
    boxShadow: 'unset',
    width: '40px',
    height: '40px'
  }
}));

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

export const RecipeSpeedDialAction = styled(SpeedDialAction)<StyledProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,

  '&:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
}));

export const RecipeCardActions = styled(CardActions)(({ islistlayout }: { islistlayout: string }) => ({
  alignItems: 'center',
  display: 'flex',
  height: islistlayout ? 'unset' : '50px',
  justifyContent: islistlayout ? 'center' : 'unset',
  paddingBottom: 0,
  paddingTop: 0,
  width: islistlayout ? '50px' : 'unset'
}));
