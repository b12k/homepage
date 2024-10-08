import { randomUUID } from 'node:crypto';
import pinoHttp from 'pino-http';

import { env } from '../env';

export const loggerService = pinoHttp({
  genReqId: (request, response) => {
    const requestId = request.headers['X-Request-Id'] || randomUUID();
    response.setHeader('X-Request-Id', requestId);
    return requestId;
  },
  level: env.LOG_LEVEL || 'silent',
});
