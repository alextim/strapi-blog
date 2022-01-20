/* eslint-disable react/no-danger */
import React from 'react';

const gaUrl = 'https://www.google-analytics.com';

function GA() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    return null;
  }
  return (
    <>
      <link rel="preconnect" href={gaUrl} />
      <link rel="dns-prefetch" href={gaUrl} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}, 'auto');
          ga('send', 'pagehide');
        `,
        }}
      />
      <script async src={`${gaUrl}/analytics.js`} />
    </>
  );
}

export default GA;
