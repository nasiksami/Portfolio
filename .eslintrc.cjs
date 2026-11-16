module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  overrides: [
    // Build and test scripts run in Node, not the browser.
    { files: ['scripts/**/*.mjs'], env: { node: true, browser: false } },
  ],
  rules: {
    // Components take a flexible, internally-defined data shape; prop-types
    // would duplicate the data modules without adding safety.
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
