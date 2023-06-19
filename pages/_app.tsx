import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/public/theme/global.module.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
