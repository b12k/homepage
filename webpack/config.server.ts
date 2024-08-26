import type { Configuration } from 'webpack';

import baseConfig from './config.base';
import env from './env';
import { createImageLoader, sassIgnoreLoader } from './loaders';
import { webpackSsrManifestPlugin } from './plugins';

const config: Configuration = {
  ...baseConfig,
  cache: {
    cacheDirectory: env.CACHE_DIR,
    name: `server-${env.IS_PROD ? 'prod' : 'dev'}`,
    type: 'filesystem',
  },
  devtool: false,
  entry: {
    index: './src/client/entry.server.ts',
  },
  module: {
    rules: [
      ...(baseConfig.module?.rules || []),
      sassIgnoreLoader,
      createImageLoader(true),
    ],
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: './ssr/index.js',
    library: {
      type: 'commonjs2',
    },
  },
  plugins: [...(baseConfig.plugins || []), webpackSsrManifestPlugin],
  target: 'node',
  watch: !env.IS_PROD,
};

export default config;
