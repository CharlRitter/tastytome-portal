import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions } from '@mui/material/styles';
import { StyledEngineProvider, ThemeProvider } from '@mui/system';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { usePathname, useRouter } from 'next/navigation';
import React, { JSX, ReactNode, useEffect, useState, StrictMode } from 'react';
import { Provider } from 'react-redux';

import { ThemeStates } from '@/constants/general';
import { darkTheme, lightTheme } from '@/public/theme/themes';
import { useAppSelector } from '@/reducers/hooks';
import { RootState, storeWrapper } from '@/reducers/store';
import { SliceItem } from '@/types/common';
import { MemberResponse } from '@/types/member';
import '@/public/theme/extensions.scss';
import '@/public/theme/tailwind.css';

export type StatefulThemeProviderProps = {
  children: ReactNode;
};

function StatefulThemeProvider({ children }: StatefulThemeProviderProps): JSX.Element {
  const router = useRouter();
  const currentRoute = usePathname();
  const { publicRuntimeConfig } = getConfig();
  const {
    data: { membersettings }
  } = useAppSelector((state: RootState): SliceItem<MemberResponse> => state.memberSlice.member);
  const [theme, setTheme] = useState<ThemeOptions>(darkTheme);
  const [systemTheme, setSystemTheme] = useState<ThemeOptions>(darkTheme);

  useEffect(() => {
    function handleColorSchemeChange({ matches }: { matches: boolean }) {
      if (matches) {
        setSystemTheme(darkTheme);
      } else {
        setSystemTheme(lightTheme);
      }
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQueryList.addEventListener('change', handleColorSchemeChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleColorSchemeChange);
    };
  }, []);

  useEffect(() => {
    if (membersettings.theme.id === ThemeStates.System) {
      setTheme(systemTheme);
    } else if (membersettings.theme.id === ThemeStates.Dark) {
      setTheme(darkTheme);
    } else if (membersettings.theme.id === ThemeStates.Light) {
      setTheme(lightTheme);
    }
  }, [membersettings.theme.id, systemTheme]);

  useEffect(() => {
    if (
      (currentRoute === '/pantry' && !publicRuntimeConfig.ENABLE_PANTRY) ||
      (currentRoute === '/shopping-list' && !publicRuntimeConfig.ENABLE_SHOPPING_LIST)
    ) {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/recipes');
      }
    }
  }, [currentRoute, publicRuntimeConfig.ENABLE_PANTRY, publicRuntimeConfig.ENABLE_SHOPPING_LIST, router]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}

export default function TastyTome({ Component, ...rest }: AppProps): JSX.Element {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const title = 'TastyTome';
  const description = 'Description of your website';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="author" content="Charl Ritter" />
        <link rel="icon" href="/path/to/favicon.ico" type="image/x-icon" />
        {/* Open Graph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="URL of the shared image" />
      </Head>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="884039361463-bj3hl4eisqb6esemsle269k4pbams3oc.apps.googleusercontent.com">
          <StrictMode>
            <StatefulThemeProvider>
              <CssBaseline />
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </StatefulThemeProvider>
          </StrictMode>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}
