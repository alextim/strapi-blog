import React from 'react';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

// eslint-disable-next-line react/function-component-definition
const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default appWithTranslation(MyApp);
