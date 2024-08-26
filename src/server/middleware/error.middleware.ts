import type { AxiosError } from 'axios';

import { type ErrorRequestHandler } from 'express';
import serialize from 'serialize-javascript';

import { env } from '../env';
import { getContext } from './context.middleware';

export const errorMiddleware: ErrorRequestHandler = (
  error: AxiosError | Error,
  request,
  response,
  next,
) => {
  if (!error) return next();

  const context = getContext();

  if (context.isDebug) {
    return response.status(500).render('debug', {
      details: serialize({
        context,
        env,
        error: error.stack?.split('\n').map((line) => line.trim()),
        request,
      }),
      message: error.message,
    });
  }

  return response.status(500).render('500');
};
