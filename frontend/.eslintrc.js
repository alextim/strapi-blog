// const path = require('path');

module.exports = {
  extends: ['next/core-web-vitals'],
  plugins: ['@emotion'],
  rules: {
    'no-restricted-exports': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    '@emotion/syntax-preference': [2, 'object'],
    '@emotion/jsx-import': 0,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
