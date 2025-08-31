FROM node:20-alpine AS builder

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
ENV PNPM_HOME=/usr/local/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração necessários para a build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Copiar arquivos de configuração do TypeScript
COPY tsconfig.json ./
COPY apps/api/tsconfig.json ./apps/api/
COPY packages/shared/tsconfig.json ./packages/shared/

# Instalar dependências
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copiar código fonte
COPY types/ ./types/
COPY packages/shared/src/ ./packages/shared/src/
COPY apps/api/src/ ./apps/api/src/

# Compilar o projeto
RUN pnpm -r build

# Imagem final
FROM node:20-alpine AS runner

# Define a variável NODE_ENV
ENV NODE_ENV=production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
ENV PNPM_HOME=/usr/local/pnpm
ENV PATH=$PNPM_HOME:$PATH

# Configurar diretório de trabalho
WORKDIR /app

# Copiar os arquivos compilados e dependências da etapa de build
COPY --from=builder --chown=nodejs:nodejs /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder --chown=nodejs:nodejs /app/apps/api/package.json ./apps/api/
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared/package.json ./packages/shared/
COPY --from=builder --chown=nodejs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/shared/dist ./packages/shared/dist

# Instalar apenas dependências de produção (sem scripts para evitar husky/prepare)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile --ignore-scripts

# Trocar para o usuário não-root
USER nodejs

# Expor a porta da aplicação
EXPOSE 3000

# Iniciar a aplicação
CMD ["node", "apps/api/dist/index.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
