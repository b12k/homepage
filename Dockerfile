FROM node:20-alpine AS base
RUN apk update
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS all-deps
COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM all-deps as prod-deps
RUN pnpm install --prod --ignore-scripts

FROM all-deps AS builder
COPY . .
RUN pnpm build

FROM base as runner
RUN yarn global add pino-pretty
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY package.json ./package.json
CMD ["pnpm", "start"]

