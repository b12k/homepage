import type { Context } from '@server';

import Pocketbase from 'pocketbase';

export function createPocketbaseService(context: Context) {
  const pb = new Pocketbase(context.pocketbaseUrl);
  return {
    pb,
  };
}
