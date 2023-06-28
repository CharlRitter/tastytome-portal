import React, { ReactNode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/public/theme/themes';
import { storeWrapper } from '@/reducers/store';
import { RootState, setIsDarkTheme } from '@/slices/settings';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function StatefulThemeProvider({ children }: { children: ReactNode }) {
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const theme = isDarkTheme ? darkTheme : lightTheme;

  useEffect(() => {
    dispatch(
      setIsDarkTheme(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, [dispatch]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default function CookScribe({ Component, ...rest }: AppProps) {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const title = 'CookScribe';
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
        <StatefulThemeProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </StatefulThemeProvider>
      </Provider>
    </>
  );
}
