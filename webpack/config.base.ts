import { type Configuration } from 'webpack';

import env from './env';
import { iconsLoader, tsLoader, vueLoader } from './loaders';
import {
  tsConfigPathsPlugin,
  vueLoaderPlugin,
  webpackDefinePlugin,
} from './plugins';

const config: Configuration = {
  mode: env.IS_PROD ? 'production' : 'development',
  module: {
    rules: [tsLoader, vueLoader, iconsLoader],
  },
  plugins: [vueLoaderPlugin, webpackDefinePlugin],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [tsConfigPathsPlugin],
  },
};

export default config;
