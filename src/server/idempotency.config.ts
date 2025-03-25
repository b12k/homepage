import type { IdempotencyConfig } from './services';

export const config: IdempotencyConfig = {
  beforeCompute: (context) => context.device.type,
  paths: {
    '/:lang': (context, parameters) => parameters.lang,
  },
};
