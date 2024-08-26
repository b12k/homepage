import path from 'node:path';

const IS_PROD = process.env.NODE_ENV !== 'development';
const WDS_PORT = Number(process.env.WDS_PORT) || 8081;
const WITH_STATS = process.env.WITH_STATS === 'true';
const ICONS_FOLDER_PATH = path.resolve(
  __dirname,
  '..',
  './src/client/assets/icons',
);
const CACHE_DIR = path.resolve(__dirname, '..', '.temp/.webpack-cache');

export default {
  CACHE_DIR,
  ICONS_FOLDER_PATH,
  IS_PROD,
  WDS_PORT,
  WITH_STATS,
};
