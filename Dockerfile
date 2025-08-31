FROM node:20-alpine AS builder

# Configurar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json tsconfig.json ./
COPY src ./src

# Instalar dependências
RUN npm install

# Compilar o projeto
RUN npm run build

# Verificar se os arquivos de build existem
RUN test -f dist/index.js || (echo 'ERRO: dist/index.js não encontrado' && exit 1)

# Imagem final
FROM node:20-alpine AS runner

# Define a variável NODE_ENV
ENV NODE_ENV=production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs

# Configurar diretório de trabalho
WORKDIR /app

# Copiar os arquivos compilados e dependências da etapa de build
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Instalar apenas dependências de produção
RUN npm install --production

# Trocar para o usuário não-root
USER nodejs

# Expor a porta da aplicação
EXPOSE 3000

# Iniciar a aplicação
CMD ["node", "dist/index.js"]

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
