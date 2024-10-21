import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import eslint from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHook from 'eslint-plugin-react-hooks';

import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
export default tseslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },
  eslint.configs.recommended,
import pluginReactHook from 'eslint-plugin-react-hooks';

import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
export default tseslint.config(
  {
    ignores: ['node_modules', 'dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      react: pluginReact,
      'react-hook': pluginReactHook,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHook.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
  eslintConfigPrettier,
);
