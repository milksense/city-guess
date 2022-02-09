import { NextUIProvider } from '@nextui-org/react';
import Head from 'next/head';

const myApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>I guess your city</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  </>
);

export default myApp;