import type { Configuration } from 'webpack';

import path from 'node:path';
import 'webpack-dev-server';

import baseConfig from './config.base';
import env from './env';
import { createImageLoader, sassLoader } from './loaders';
import {
  bundleStatsWebpackPlugin,
  miniCssExtractPlugin,
  terserPlugin,
  webpackClientManifestPlugin,
  webpackProgressPlugin,
} from './plugins';
import { getFilenameJs, getVendorName } from './utils';

const config: Configuration = {
  ...baseConfig,
  // cache: {
  //   cacheDirectory: env.CACHE_DIR,
  //   name: `browser-${env.IS_PROD ? 'prod' : 'dev'}`,
  //   type: 'filesystem',
  // },
  devServer: {
    client: {
      overlay: {
        warnings: false,
      },
    },
    devMiddleware: {
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    port: env.WDS_PORT,
  },
  devtool: env.IS_PROD ? 'source-map' : false,
  entry: {
    app: './src/client/entry.browser.ts',
  },
  module: {
    rules: [
      ...(baseConfig.module?.rules || []),
      sassLoader,
      createImageLoader(),
    ],
  },
  output: {
    chunkFilename: getFilenameJs('chunk', env.IS_PROD),
    filename: getFilenameJs('[name]', env.IS_PROD),
    path: path.resolve(__dirname, '../dist'),
    publicPath: env.IS_PROD ? '/' : `http://localhost:${env.WDS_PORT}/`,
  },
  performance: {
    hints: false,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    webpackClientManifestPlugin,
    webpackProgressPlugin,
    ...(env.IS_PROD ? [miniCssExtractPlugin, terserPlugin] : []),
    ...(env.WITH_STATS ? [bundleStatsWebpackPlugin] : []),
  ],
  stats: {
    colors: true,
    preset: 'normal',
  },
};

if (env.IS_PROD) {
  config.optimization = {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        async: {
          chunks: 'async',
          filename: getFilenameJs('vendor', env.IS_PROD),
          minChunks: 2,
          // enforce: true,
          minSize: 0,
          name: getVendorName,
          test: /[/\\]node_modules[/\\]/,
        },
        vendor: {
          chunks: 'initial',
          filename: getFilenameJs('vendor', env.IS_PROD),
          name: getVendorName,
          // enforce: true,
          test: /[/\\]node_modules[/\\]/,
        },
      },
    },
  };
}

export default config;
