import { ThemeOptions, createTheme } from '@mui/material/styles';
import { customCommonColors, themeColours } from '@/public/theme/colours';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: themeColours.lightPrimaryMain
    },
    secondary: {
      main: themeColours.lightSecondaryMain
    },
    background: {
      default: themeColours.lightBackgroundDefault,
      paper: themeColours.lightBackgroundPaper
    },
    common: customCommonColors
  }
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: themeColours.darkPrimaryMain
    },
    secondary: {
      main: themeColours.darkSecondaryMain
    },
    background: {
      default: themeColours.darkBackgroundDefault,
      paper: themeColours.darkBackgroundPaper
    },
    common: customCommonColors
  }
};

const extensionOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  shape: {
    borderRadius: 5
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.main': {
            padding: '1.25rem 1.5rem'
          }
        }
      }
    }
  }
};

export const lightTheme = createTheme({ ...lightThemeOptions, ...extensionOptions });
export const darkTheme = createTheme({ ...darkThemeOptions, ...extensionOptions });
