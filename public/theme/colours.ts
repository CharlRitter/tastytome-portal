import { CommonColors } from '@mui/material';

export const colours = {
  lightPrimary: '#432d4e',
  lightSecondary: '#fdd3a3',
  lightBackground: '#eee',
  darkPrimary: '#70b8c7',
  darkSecondary: '#fd9001',
  darkBackground: '#121212',
  lightGray: '#d3d3d3',
  veryLightBlack: '#000'
};

export const sharedColours: Partial<CommonColors & typeof colours> = {
  lightGray: colours.lightGray,
  veryLightBlack: colours.veryLightBlack
};
