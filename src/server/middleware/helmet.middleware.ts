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
          imgSrc: ["'self'", 'data:', 'https://via.placeholder.com'],
          scriptSrc: ["'self'", `'nonce-${requestId}'`, "'unsafe-eval'"],
        },
      },
    };

    return helmet(options)(request, response, next);
  };
