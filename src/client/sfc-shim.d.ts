import type { RouteLocationNormalized } from 'vue-router';

import type { Services } from './services';

declare module 'vue' {
  interface ComponentCustomOptions {
    fetchData?: (to: RouteLocationNormalized) => unknown;
    shouldReFetch?: boolean;
  }
  interface ComponentCustomProperties {
    $services: Services;
  }
}

export {};
