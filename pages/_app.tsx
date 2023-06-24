import React, { ReactNode } from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/public/theme/themes';
import rootReducer from '@/reducers/root';
import { RootReducerState } from '@/constants/types';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function StatefulThemeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useSelector((state: RootReducerState) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default function CookScribe({ Component, pageProps }: AppProps) {
  const store = configureStore({ reducer: rootReducer });
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
