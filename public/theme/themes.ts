import { ThemeOptions, createTheme } from '@mui/material/styles';
import { colours, sharedColours } from '@/public/theme/colours';
import overrides from '@/public/theme/overrides';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colours.lightPrimary
    },
    secondary: {
      main: colours.lightSecondary
    },
    background: {
      default: colours.lightBackground
    },
    common: sharedColours
  },
  ...overrides
};

export const lightTheme = createTheme(lightThemeOptions);

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: colours.darkPrimary
    },
    secondary: {
      main: colours.darkSecondary
    },
    background: {
      default: colours.darkBackground
    },
    common: sharedColours
  },
  ...overrides
};

export const darkTheme = createTheme(darkThemeOptions);
