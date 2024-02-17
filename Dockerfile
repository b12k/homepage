FROM node:20-alpine AS base
RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
COPY package.json ./package.json

FROM base AS prod-deps
COPY pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts --prod

FROM base AS builder
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build

FROM base AS runner
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
CMD ["pnpm", "start"]

