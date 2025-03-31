import type { Context } from '@server';
import type { Logger } from 'pino';
import type { App, ObjectPlugin } from 'vue';

import { createApi } from './api.service';
import { createPocketbaseService } from './create-pocketbase.service';

export type Services = ReturnType<typeof createServices>;

export function createServices(context: Context, logger: Logger) {
  return {
    api: createApi(),
    logger,
    pb: createPocketbaseService(context).pb,
  };
}

export function createServicesPiniaPlugin(services: Services) {
  return () => ({
    $services: services,
  });
}

export function createServicesVuePlugin(services: Services): ObjectPlugin {
  return {
    install: (app: App) => {
      app.config.globalProperties.$services = services;
      app.provide('$services', services);
    },
  };
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $services: Services;
  }
}
