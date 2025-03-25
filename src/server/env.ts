import { hostname } from 'node:os';
import path from 'node:path';
import z from 'zod';

const ONE_DAY = (60 * 60 * 24).toString();

function castStringToPositiveNumber(
  name: string,
  value?: string,
): never | number {
  const numValue = Number(value);
  if (Number.isNaN(numValue) || numValue <= 0)
    throw new Error(`${name} must be a positive number`);
  return numValue;
}

const envSchema = z
  .object({
    ACCEPTED_LANGUAGES: z
      .string()
      .default('en')
      .transform((value) => value.split(',').map((lang) => lang.trim()))
      .pipe(z.array(z.string().length(2))),
    CRITICAL_CSS_CACHE_SALT: z.string().optional(),
    CRITICAL_CSS_CACHE_TTL: z
      .string()
      .default(ONE_DAY)
      .transform((value) =>
        castStringToPositiveNumber('CRITICAL_CSS_CACHE_TTL', value),
      ),
    DEBUG_MODE_PASSWORD: z.string().optional(),
    DEFAULT_LANGUAGE: z.string().length(2).default('en'),
    IS_CACHE_ENABLED: z
      .enum(['true', 'false'])
      .default('true')
      .transform((value) => value === 'true'),
    IS_CRITICAL_CSS_CACHE_ENABLED: z.enum(['true', 'false']).optional(),
    IS_DEBUG_MODE: z
      .string()
      .default('false')
      .transform((value) => value === 'true'),
    IS_RENDER_CACHE_ENABLED: z.enum(['true', 'false']).optional(),
    LOG_LEVEL: z
      .enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'])
      .default('info'),
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z
      .string()
      .transform((value) => castStringToPositiveNumber('PORT', value)),
    REDIS_URL: z.string().url().optional(),
    RENDER_CACHE_SALT: z.string().optional(),
    RENDER_CACHE_TTL: z
      .string()
      .default(ONE_DAY)
      .transform((value) =>
        castStringToPositiveNumber('RENDER_CACHE_TTL', value),
      ),
    SERVER_ENV: z.string(),
    VERSION: z.string().transform(() => {
      const version = process.env.npm_package_version;
      if (!version)
        throw new Error('APP_VERSION (from package.json) is required');
      return version;
    }),
    WDS_PORT: z
      .string()
      .optional()
      .transform((value) => castStringToPositiveNumber('WDS_PORT', value)),
  })
  .transform((values) => ({
    ...values,
    CRITICAL_CSS_CACHE_SALT: values.CRITICAL_CSS_CACHE_SALT || values.VERSION,
    IS_CRITICAL_CSS_CACHE_ENABLED:
      values.IS_CRITICAL_CSS_CACHE_ENABLED || values.IS_CACHE_ENABLED,
    IS_PROD: values.NODE_ENV === 'production',
    IS_RENDER_CACHE_ENABLED:
      values.IS_RENDER_CACHE_ENABLED || values.IS_CACHE_ENABLED,
    RENDER_CACHE_SALT: values.RENDER_CACHE_SALT || values.VERSION,
    WDS_PORT: values.WDS_PORT || values.PORT + 1,
  }))
  .refine((values) => values.PORT !== values.WDS_PORT, {
    message: 'PORT and WDS_PORT must be different',
    path: ['WDS_PORT'],
  });

const providedEnv = envSchema.parse(process.env);

const ASSETS_LOCATION_PATH = path.resolve(
  __dirname,
  providedEnv.IS_PROD ? '../' : '../../dist',
);
const PUBLIC_PATH = path.resolve(ASSETS_LOCATION_PATH, 'public');
const CLIENT_MANIFEST_PATH = path.resolve(PUBLIC_PATH, 'manifest.json');
const SSR_RENDERER_PATH = path.resolve(ASSETS_LOCATION_PATH, 'ssr');
const SSR_MANIFEST_PATH = path.resolve(SSR_RENDERER_PATH, 'manifest.json');
const VIEWS_PATH = path.resolve(__dirname, 'views');
const FAVICON_PATH = path.resolve(PUBLIC_PATH, 'favicon.ico');
const HOSTNAME = hostname();

export const env = {
  ...providedEnv,
  ASSETS_LOCATION_PATH,
  CLIENT_MANIFEST_PATH,
  FAVICON_PATH,
  HOSTNAME,
  IS_OVERRIDDEN: 'false',
  PUBLIC_PATH,
  SSR_MANIFEST_PATH,
  SSR_RENDERER_PATH,
  VIEWS_PATH,
};

export type Env = typeof env;
