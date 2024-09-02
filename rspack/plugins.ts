import rspack from '@rspack/core';
import { RspackManifestPlugin } from 'rspack-manifest-plugin';
import { VueLoaderPlugin } from 'vue-loader';

import { generateManifest } from './utils';

export const vuePlugin = new VueLoaderPlugin();

export const definePlugin = new rspack.DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: true,
  __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
});

export const cssExtractRspackPlugin = new rspack.CssExtractRspackPlugin({
  chunkFilename: 'public/css/chunk.[contenthash:8].css',
  filename: 'public/css/[name].[contenthash:8].css',
});

export const createManifestPlugin = (isSSR = false) =>
  new RspackManifestPlugin({
    fileName: isSSR ? 'ssr/manifest.json' : 'public/manifest.json',
    generate: isSSR ? undefined : generateManifest,
    useEntryKeys: isSSR,
  });

export const swcJsMinimizerRspackPlugin = new rspack.SwcJsMinimizerRspackPlugin(
  {
    extractComments: false,
  },
);

export const createProgressPlugin = (isSSR = false) =>
  new rspack.ProgressPlugin({
    prefix: isSSR ? '[[[ Compile for SSR ]]]' : '[[[ Compile for Browser ]]]',
  });
