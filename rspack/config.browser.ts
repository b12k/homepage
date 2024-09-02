import { defineConfig } from '@rspack/cli';

import baseConfig from './config.base';
import env from './env';
import { createImageLoader, scssLoader } from './loaders';
import {
  createManifestPlugin,
  createProgressPlugin,
  cssExtractRspackPlugin,
  swcJsMinimizerRspackPlugin,
} from './plugins';
import { getFilenameJs, getVendorName } from './utils';

const config = defineConfig({
  ...baseConfig,
  entry: {
    app: './src/client/entry.browser.ts',
  },
  experiments: {
    css: false,
  },
  module: {
    rules: [
      ...(baseConfig.module?.rules || []),
      scssLoader,
      createImageLoader(),
    ],
  },
  output: {
    chunkFilename: getFilenameJs('chunk', env.IS_PROD),
    filename: getFilenameJs('[name]', env.IS_PROD),
    path: env.OUTPUT_PATH,
    publicPath: env.OUTPUT_PUBLIC_PATH,
  },
  plugins: [
    ...(baseConfig.plugins || []),
    createManifestPlugin(),
    createProgressPlugin(),
  ],
});

if (env.IS_PROD) {
  config.plugins = [
    ...(config.plugins || []),
    cssExtractRspackPlugin,
    swcJsMinimizerRspackPlugin,
  ];
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
} else {
  config.devServer = {
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
  };
}

export default config;
