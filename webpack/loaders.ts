import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { type RuleSetRule } from 'webpack';

import env from './env';

export const tsLoader: RuleSetRule = {
  loader: 'swc-loader',
  options: {
    jsc: {
      parser: {
        syntax: 'typescript',
      },
      target: 'esnext',
    },
    sourceMaps: env.IS_PROD,
  },
  test: /\.ts$/,
};

export const vueLoader: RuleSetRule = {
  loader: 'vue-loader',
  test: /\.vue$/,
};

export const sassLoader: RuleSetRule = {
  test: /\.s?css$/,
  use: [
    env.IS_PROD ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    { loader: 'css-loader', options: { sourceMap: env.IS_PROD } },
    { loader: 'postcss-loader', options: { sourceMap: env.IS_PROD } },
    { loader: 'sass-loader', options: { sourceMap: env.IS_PROD } },
  ],
};

export const sassIgnoreLoader: RuleSetRule = {
  test: /\.s?css$/,
  use: ['ignore-loader'],
};

export const iconsLoader: RuleSetRule = {
  include: env.ICONS_FOLDER_PATH,
  test: /\.svg$/,
  type: 'asset/source',
};

export const createImageLoader = (isSSR = false): RuleSetRule => ({
  exclude: env.ICONS_FOLDER_PATH,
  test: /\.(png|gif|jpe?g|svg|webp)$/,
  type: 'javascript/auto',
  use: [
    {
      loader: 'url-loader',
      options: {
        esModule: false,
        fallback: {
          loader: 'file-loader',
          options: {
            emitFile: !isSSR,
            esModule: false,
          },
        },
        limit: 24_000,
        name: `${isSSR ? '/' : ''}public/images/[ext]/[name]${
          env.IS_PROD ? '.[contenthash:8]' : ''
        }.[ext]`,
      },
    },
  ],
});
