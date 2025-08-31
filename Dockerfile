# ---- base ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- deps ----
FROM base AS deps
COPY package*.json ./
# Use lockfile for deterministic installs
RUN npm ci

# ---- build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- prod-deps (production-only node_modules) ----
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# ---- dev ----
FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json tsconfig.json ./
# Install once during build (cached)
RUN npm ci
COPY src ./src
EXPOSE 3000
# Ensure deps in named volume on first run, then start
CMD ["sh", "-c", "if [ ! -d node_modules ] || [ -z \"$(ls -A node_modules 2>/dev/null)\" ]; then npm ci; fi; npm run dev"]

# ---- prod ----
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY --from=build /app/dist ./dist
RUN apk add --no-cache wget
# Drop privileges
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["npm", "start"]
