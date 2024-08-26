import type { Context } from '@server';

import { createHead } from '@unhead/vue';
import { createPinia, type StateTree } from 'pinia';
import { createSSRApp } from 'vue';
import { createRouter, type RouterHistory } from 'vue-router';

import App from './app.vue';
import { routes } from './router';
import { logger } from './services';

export type InitialState = { context: Context } & StateTree;

export const createApp = async (
  history: RouterHistory,
  initialState: InitialState,
) => {
  const app = createSSRApp(App);
  const head = createHead();
  const store = createPinia();
  const router = createRouter({
    history,
    routes,
  });

  app.use(router).use(store).use(head);

  store.state.value = initialState;

  app.config.errorHandler = (error, instance, info) => {
    logger.error(error, info, [instance]);
  };

  await router.push(initialState.context.url);
  await router.isReady();

  return {
    app,
    head,
    router,
    store,
  };
};
