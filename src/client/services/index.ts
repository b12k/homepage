import type { Context } from '@server';
import type { Logger } from 'pino';

import { createApi } from './api.service';

export type Services = ReturnType<typeof createServices>;

export function createServices(context: Context, logger: Logger) {
  return {
    api: createApi(context),
    logger: logger,
  };
}

export function createServicesPiniaPlugin(services: Services) {
  return () => ({
    $services: services,
  });
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $services: Services;
  }
}
