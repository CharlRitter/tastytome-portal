import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/public/theme/themes';
import rootReducer from '@/reducers/rootReducer';
import { RootReducerState } from '@/constants/types';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface Props extends AppProps {
  children: React.ReactNode;
}

function StatefulThemeProvider({ Component, pageProps }: Props) {
  const isDarkMode = useSelector((state: RootReducerState) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const store = configureStore({ reducer: rootReducer });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>CookScribe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Description of your website" />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="author" content="Charl Ritter" />
        <link rel="icon" href="/path/to/favicon.ico" type="image/x-icon" />
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Title for sharing" />
        <meta property="og:description" content="Description for sharing" />
        <meta property="og:image" content="URL of the shared image" />
      </Head>
      <Provider store={store}>
        <StatefulThemeProvider Component={Component} pageProps={pageProps} router={router}>
          <CssBaseline />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </StatefulThemeProvider>
      </Provider>
    </>
  );
}
