/* eslint-disable no-console */

// https://itnext.io/using-i18n-with-next-js-react-context-api-ab208659cee8
// https://github.com/typedef42/nextjs-fastify-i18n

// https://www.mckenna.codes/blog/nextjs-localized-routes-tutorial

// https://blog.logrocket.com/complete-guide-internationalization-nextjs/

// https://github.com/UnlyEd/next-right-now

const packageJson = require('./package.json');

// const noRedirectBlacklistedPaths = ['_next', 'api']; // Paths that mustn't have rewrite applied to them, to avoid the whole app to behave inconsistently
// const publicBasePaths = ['robots', 'static', 'favicon.ico']; // All items (folders, files) under /public directory should be added there, to avoid redirection when an asset isn't found
/*
const noRedirectBasePaths = [
  // ...supportedLocales,
  ...publicBasePaths,
  ...noRedirectBlacklistedPaths,
]; // Will disable url rewrite for those items (should contain all supported languages and all public base paths)
*/
const date = new Date();

// We use `filter` to make sure there are not empty element.
// Default value is an empty array.
const GIT_COMMIT_TAGS = process.env.GIT_COMMIT_TAGS ? process.env.GIT_COMMIT_TAGS.trim() : '';
console.debug(`Deployment will be tagged automatically, using GIT_COMMIT_TAGS: "${GIT_COMMIT_TAGS}"`);

// Iterate over all tags and extract the first the match "v*" and extract only the version number ("v${major}.${minor}.${patch})
// eslint-disable-next-line prettier/prettier
const APP_RELEASE_TAG = GIT_COMMIT_TAGS ? GIT_COMMIT_TAGS.split(' ').find((tag) => tag.startsWith('v')).split('-')[0] : 'unknown';
console.debug(`Release version resolved from tags: "${APP_RELEASE_TAG}" (matching first tag starting with "v")`);
console.debug(
  `Building Next with NODE_ENV="${process.env.NODE_ENV}" NEXT_PUBLIC_APP_STAGE="${process.env.NEXT_PUBLIC_APP_STAGE}" for NEXT_PUBLIC_CUSTOMER_REF="${process.env.NEXT_PUBLIC_CUSTOMER_REF}" using GIT_COMMIT_SHA=${process.env.GIT_COMMIT_SHA} and GIT_COMMIT_REF=${process.env.GIT_COMMIT_REF}`,
);

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  swcMinify: true,

  env: {
    GITHUB_DISPATCH_TOKEN: process.env.GITHUB_DISPATCH_TOKEN,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    LOCIZE_API_KEY: process.env.LOCIZE_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,

    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,

    // Dynamic env variables
    NEXT_PUBLIC_APP_BUILD_TIME: date.toString(),
    NEXT_PUBLIC_APP_BUILD_TIMESTAMP: +date,
    NEXT_PUBLIC_APP_NAME: packageJson.name,
    NEXT_PUBLIC_APP_NAME_VERSION: `${packageJson.name}-${APP_RELEASE_TAG}`,
    UNLY_SIMPLE_LOGGER_ENV: process.env.NEXT_PUBLIC_APP_STAGE, // Used by @unly/utils-simple-logger - Fix missing staging logs because otherwise it believes we're in production
    GIT_COMMIT_SHA: process.env.GIT_COMMIT_SHA, // Resolve commit hash from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
    GIT_COMMIT_REF: process.env.GIT_COMMIT_REF, // Resolve commit ref (branch/tag) from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
    GIT_COMMIT_TAGS: process.env.GIT_COMMIT_TAGS || '', // Resolve commit tags/releases from ENV first (set through CI), fallbacks to reading git (when used locally, through "/scripts/populate-git-env.sh")
  },

  async headers() {
    const headers = [];

    // XXX Forbid usage in iframes from external 3rd parties, for non-production site
    //  This is meant to avoid customers using the preview in their production website, which would incur uncontrolled costs on our end
    //  Also, our preview env cannot scale considering each request send many airtable API calls and those are rate limited and out of our control
    if (process.env.NEXT_PUBLIC_APP_STAGE !== 'production') {
      headers.push({
        source: '/(.*?)', // Match all paths, including "/" - See https://github.com/vercel/next.js/discussions/17991#discussioncomment-112028
        // source: '/:path*', // Match all paths, excluding "/"
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *.stacker.app',
          },
        ],
      });
    }

    console.info('Using headers:', JSON.stringify(headers, null, 2));

    return headers;
  },

  async rewrites() {
    const rewrites = [
      /*
      // I18n rewrites
      {
        // XXX Doesn't work locally (maybe because of rewrites), but works online
        source: '/',
        destination: '/api/autoRedirectToLocalisedPage',
      },
      {
        source: `/:locale((?!${noRedirectBasePaths.join('|')})[^/]+)(.*)`,
        destination: '/api/autoRedirectToLocalisedPage',
      },
      */
      // Robots rewrites
      {
        source: '/robots.txt',
        destination: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? '/robots/production.txt' : '/robots/!production.txt',
      },
    ];

    console.info('Using rewrites:', rewrites);

    return rewrites;
  },
};
