import { ThemeOptions, createTheme } from '@mui/material/styles';
import colours from '@/public/theme/colours';
import overrides from '@/public/theme/overrides';

declare module '@mui/material' {
  interface IconButtonPropsColorOverrides {
    white: true;
    veryLightGray: true;
    lightGray: true;
    lightBlack: true;
    black: true;
  }
}

const sharedColours = {
  white: {
    main: colours.white
  },
  veryLightGray: {
    main: colours.veryLightGray
  },
  lightGray: {
    main: colours.lightGray
  },
  lightBlack: {
    main: colours.lightBlack
  },
  black: {
    main: colours.black
  }
};

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
      default: colours.veryLightGray
    },
    ...sharedColours
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
    ...sharedColours
  },
  ...overrides
};

export const darkTheme = createTheme(darkThemeOptions);
