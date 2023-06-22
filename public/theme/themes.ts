import { ThemeOptions, createTheme } from '@mui/material/styles';

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
    main: '#fff'
  },
  veryLightGray: {
    main: '#EEEEEE'
  },
  lightGray: {
    main: '#D3D3D3'
  },
  lightBlack: {
    main: '#121212'
  },
  black: {
    main: '#000'
  }
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#432D4E'
    },
    secondary: {
      main: '#fdd3a3'
    },
    background: {
      default: '#EEEEEE'
    },
    ...sharedColours
  },
  shape: {
    borderRadius: 5
  }
};

export const lightTheme = createTheme(lightThemeOptions);

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#70b8c7'
    },
    secondary: {
      main: '#fd9001'
    },
    ...sharedColours
  },
  shape: {
    borderRadius: 5
  }
};

export const darkTheme = createTheme(darkThemeOptions);
