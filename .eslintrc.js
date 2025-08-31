module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.js',
    'jest.config.js',
    'coverage'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      'allowExpressions': true,
      'allowTypedFunctionExpressions': true
    }],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
  }
};
