/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import languageDetector from './languageDetector';

export const useRedirect = (to) => {
  const router = useRouter();
  // eslint-disable-next-line no-param-reassign
  to = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to.startsWith(`/${detectedLng}`) && router.route === '/404') {
      // prevent endless loop
      router.replace(`/${detectedLng}${router.route}`);
      return;
    }

    languageDetector.cache(detectedLng);
    router.replace(`/${detectedLng}${to}`);
  });
};

export function Redirect({ to }) {
  useRedirect(to);
  return <></>;
}
