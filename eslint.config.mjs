import jsPlugin from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';
import vuePlugin from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import {
  config as createTsConfig,
  configs as tsConfigs,
} from 'typescript-eslint';

export default createTsConfig(
  globalIgnores(['node_modules', 'dist', '.temp']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  jsPlugin.configs.recommended,
  ...tsConfigs.recommended,
  ...vuePlugin.configs['flat/strongly-recommended'],
  unicornPlugin.configs.all,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  perfectionistPlugin.configs['recommended-natural'],
  prettierPlugin,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['!**/src/**/*'],
        },
      ],
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Dir: true,
            dir: true,
            Env: true,
            env: true,
            num: true,
            props: true,
            Props: true,
            utils: true,
            Utils: true,
          },
        },
      ],
    },
  },
);
