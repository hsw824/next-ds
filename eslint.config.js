import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHook from 'eslint-plugin-react-hooks';

import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const baseEslintConfig = tseslint.config(
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
      'prettier/prettier': 'error',
      'react/jsx-uses-vars': 'error',

      'react/no-unused-state': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error', // 재할당이 없는 변수는 const 사용
      'no-console': 'warn',
    },
  },
  eslintConfigPrettier,
);

export default baseEslintConfig;
