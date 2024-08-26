import type { Context } from '@server';

import { renderSSRHead } from '@unhead/ssr';
import { renderToString } from 'vue/server-renderer';
import { createMemoryHistory } from 'vue-router';

import { createApp } from './create-app';
import { execRoutePreFetch } from './router';
import { type Logger, replaceLogger } from './services';

const render = async (context: Context, logger: Logger) => {
  replaceLogger(logger);

  const history = createMemoryHistory(context.baseUrl);
  const { app, head, router, store } = await createApp(history, { context });

  await execRoutePreFetch(router.currentRoute.value, undefined, true);

  return {
    currentRoute: router.currentRoute.value,
    head: await renderSSRHead(head),
    html: await renderToString(app),
    state: store.state.value,
  };
};

export type Render = (
  context: Context,
  logger: Logger,
) => ReturnType<typeof render>;
export type RenderResult = Awaited<ReturnType<typeof render>>;
export default render;
