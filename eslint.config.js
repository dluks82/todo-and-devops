const { FlatCompat } = require('@eslint/eslintrc')
const path = require('path')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: ['eslint:recommended'],
  },
})

module.exports = [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ),
  {
    files: ['**/*.ts'],
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      'commitlint.config.js',
      'eslint.config.js',
      '.husky/**',
      'jest.config.js',
    ],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.test.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    files: ['**/*.js'],
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.config.js',
      'commitlint.config.js',
      'eslint.config.js',
      '.husky/**',
      'jest.config.js',
    ],
  },
]
