import type { RouteLocationNormalized } from 'vue-router';

declare module 'vue' {
  interface ComponentCustomOptions {
    fetchData?: (to: RouteLocationNormalized) => unknown;
    shouldReFetch?: boolean;
  }
}

export {};
