import { type Request } from 'express';
import { UAParser } from 'ua-parser-js';

import { env, type Env } from '../env';
import { createRequestPropertyExtractor, overrideEnv } from '../utils';

interface Device {
  type: 'desktop' | 'mobile' | 'tablet';
}

export const buildContext = (request: Request) => {
  const getRequestProperty = createRequestPropertyExtractor(request);
  const debugModePassword = getRequestProperty('DEBUG_MODE_PASSWORD');
  const envOverridesProperty = getRequestProperty('ENV_OVERRIDES');
  const isCacheEnabled =
    env.IS_CACHE_ENABLED && getRequestProperty('IS_CACHE_ENABLED') !== 'false';
  const isRenderCacheEnabled =
    isCacheEnabled &&
    env.IS_RENDER_CACHE_ENABLED &&
    getRequestProperty('IS_RENDER_CACHE_ENABLED') !== 'false';
  const isCriticalCssCacheEnabled =
    isCacheEnabled &&
    env.IS_CRITICAL_CSS_CACHE_ENABLED &&
    getRequestProperty('IS_CRITICAL_CSS_CACHE_ENABLED') !== 'false';
  const shouldRefreshRenderCache =
    getRequestProperty('REFRESH_RENDER_CACHE') === 'true';
  const shouldRefreshCriticalCssCache =
    getRequestProperty('REFRESH_CRITICAL_CSS_CACHE') === 'true';
  const isDebug =
    env.IS_DEBUG_MODE || env.DEBUG_MODE_PASSWORD === debugModePassword;

  let maybeOverridenEnv: Env = env;
  if (isDebug && envOverridesProperty) {
    try {
      const envOverrides = JSON.parse(envOverridesProperty) as Partial<Env>;
      maybeOverridenEnv = overrideEnv(env, envOverrides);
    } catch {
      maybeOverridenEnv.IS_OVERRIDDEN = 'false';
    }
  }
  const {
    device: { type: detectedDeviceType },
  } = new UAParser(request.headers['user-agent']).getResult();

  const device: Device = {
    type: 'mobile',
  };

  switch (detectedDeviceType) {
    case 'mobile':
    case 'tablet': {
      device.type = detectedDeviceType;
      break;
    }
    default: {
      device.type = 'desktop';
    }
  }

  return {
    baseUrl: request.baseUrl,
    device,
    isCacheEnabled,
    isContextPatched: false,
    isCriticalCssCacheEnabled,
    isDebug,
    isEnvOverridden: maybeOverridenEnv.IS_OVERRIDDEN === 'true',
    isProd: env.NODE_ENV !== 'development',
    isRenderCacheEnabled,
    lang: request.params.lang,
    query: request.query,
    requestId: typeof request.id === 'object' ? '' : request.id.toString(),
    shouldRefreshCriticalCssCache,
    shouldRefreshRenderCache,
    url: request.url,
    version: env.VERSION,
  };
};

export type BuildContext = ReturnType<typeof buildContext>;
export type Context = BuildContext & { cached?: Partial<BuildContext> };
