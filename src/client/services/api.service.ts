import type { Context } from '@server';
export function createApi(context: Context) {
  console.log(context);

  return {
    get: () => {
      console.log('banana');
    },
  };
}
