const { defineConfig } = require('eslint/config')
const expoConfigFlat = require('eslint-config-expo/flat')
const prettier = require('eslint-config-prettier')
const reactNativePlugin = require('eslint-plugin-react-native')

module.exports = defineConfig([
  ...expoConfigFlat,
  {
    plugins: {
      'react-native': reactNativePlugin,
    },
    ignores: ['dist/**', 'build/**', 'node_modules/**'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index'],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'react-native/no-inline-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    },
  },
  prettier,
])
