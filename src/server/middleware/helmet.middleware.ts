import { type RequestHandler } from 'express';
import helmet, { type HelmetOptions } from 'helmet';

export const helmetMiddleware =
  (isEnabled: boolean): RequestHandler =>
  (request, response, next) => {
    if (!isEnabled) return next();

    const requestId =
      typeof request.id === 'object' ? '' : request.id.toString();

    const options: HelmetOptions = {
      contentSecurityPolicy: {
        directives: {
          connectSrc: [
            "'self'",
            'https://cloud.umami.is',
            'https://api-gateway.umami.is',
          ],
          imgSrc: [
            "'self'",
            'data:',
            'https://picsum.photos',
            'https://fastly.picsum.photos',
          ],
          scriptSrc: [
            "'self'",
            `'nonce-${requestId}'`,
            "'unsafe-eval'",
            'https://cloud.umami.is',
          ],
        },
      },
    };

    return helmet(options)(request, response, next);
  };
