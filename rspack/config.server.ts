import { defineConfig } from '@rspack/cli';

import baseConfig from './config.base';
import env from './env';
import { createImageLoader, sassIgnoreLoader } from './loaders';
import { createManifestPlugin, createProgressPlugin } from './plugins';

const config = defineConfig({
  ...baseConfig,
  devtool: false,
  entry: {
    index: './src/client/entry.server.ts',
  },
  module: {
    rules: [
      ...(baseConfig.module?.rules || []),
      createImageLoader(true),
      sassIgnoreLoader,
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
  plugins: [
    ...(baseConfig.plugins || []),
    createManifestPlugin(true),
    createProgressPlugin(true),
  ],
  target: 'node',
  watch: !env.IS_PROD,
});

export default config;
