const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest-dom/recommended',
    'prettier',
  ],
  plugins: ['jsx-a11y', 'prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', { ...prettierOptions }],
    'no-console': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
    ],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'import/no-unresolved': ['error', { ignore: ['\\.svg\\?react$'] }],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
