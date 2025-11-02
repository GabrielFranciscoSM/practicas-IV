// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    // Global ignores
    ignores: ['dist/', 'build/', 'node_modules/', '*.config.*', '.vscode/', '*.d.ts'],
  },
  {
    // Base configuration for all files
    files: ['**/*.js', '**/*.ts'],
    // Apply recommended rules from ESLint and typescript-eslint
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    // Language options
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        node: true,
        es2021: true,
      }
    },
    // Custom rules
    rules: {
      'no-console': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    },
  },
  // Add Prettier config last to override other formatting rules
  prettierConfig
);