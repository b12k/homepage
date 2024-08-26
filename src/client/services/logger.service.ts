import pino from 'pino';
export let logger = pino();

export type Logger = typeof logger;

export const replaceLogger = (_logger: Logger) => {
  logger = _logger;
};
