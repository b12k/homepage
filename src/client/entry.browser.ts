import '@popperjs/core';
import 'bootstrap';
import { createWebHistory } from 'vue-router';

import { createApp, type InitialState } from './create-app';
import { execRoutePreFetch } from './router';
import { logger } from './services';
import './styles/main.scss';
import { deserialize } from './utils';

declare global {
  interface Window {
    INITIAL_STATE: string;
  }
}

(async () => {
  const initialState = deserialize<InitialState>(window.INITIAL_STATE);
  const history = createWebHistory(initialState.context.baseUrl);
  // const history = createWebHistory('/');
  const { app, router } = await createApp(history, initialState);

  app.mount('#app');

  let alreadyNavigatingTo: string | undefined;
  router.beforeEach(async (to, from) => {
    if (alreadyNavigatingTo === to.fullPath) return false;
    alreadyNavigatingTo = to.fullPath;
    try {
      await execRoutePreFetch(to, from);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  window.addEventListener('error', (error) => {
    logger.error(error);
  });
})();
