import type { Request } from 'express';

import { env } from '../env';

const { ACCEPTED_LANGUAGES, DEFAULT_LANGUAGE } = env;

export const getLanguage = (request: Request) => {
  const { cookies, params } = request;

  return ((ACCEPTED_LANGUAGES.includes(params.lang) && params.lang) ||
    (ACCEPTED_LANGUAGES.includes(cookies.lang as string) && cookies.lang) ||
    request.acceptsLanguages(ACCEPTED_LANGUAGES) ||
    DEFAULT_LANGUAGE) as string;
};
