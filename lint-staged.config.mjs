const STYLES = '*.s?css';
const SCRIPTS = '*.[mc]?[jt]sx?';
const VUE = '*.vue';
const PACKAGE_JSON = 'package.json';
const OTHER = `!(${[SCRIPTS, STYLES, PACKAGE_JSON, VUE].join('|')})`;

const tsc = 'pnpm _tsc';
const eslint = 'pnpm _eslint --fix';
const prettier = 'pnpm _prettier -w';
const stylelint = 'pnpm _stylelint --fix';
const sortPackageJson = 'pnpm _sort-package-json';

export default {
  [`${SCRIPTS}|CODE`]: eslint,
  [`${SCRIPTS}|TYPES`]: tsc,
  [`${VUE}|CODE`]: [eslint, prettier],
  [`${VUE}|STYLES`]: stylelint,
  [`${VUE}|TYPES`]: tsc,
  [OTHER]: prettier,
  [PACKAGE_JSON]: [sortPackageJson, prettier],
  [STYLES]: [stylelint, prettier],
};
