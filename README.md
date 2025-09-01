# 📋 Todo API

[![CI](https://github.com/dluks82/todo-and-devops/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/ci.yml)
[![CodeQL](https://github.com/dluks82/todo-and-devops/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/codeql.yml)
[![Coolify Deploy](https://github.com/dluks82/todo-and-devops/actions/workflows/coolify-deploy.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/coolify-deploy.yml)
[![GHCR](https://img.shields.io/badge/ghcr.io%2Fdluks82%2Ftodo--and--devops--api-available-blue?logo=github)](https://github.com/dluks82?tab=packages&repo_name=todo-and-devops)
[![API](https://img.shields.io/website?url=https%3A%2F%2Fapi-todoanddevops.11051982.xyz%2Fhealth&up_message=online&down_message=offline)](https://api-todoanddevops.11051982.xyz/health)
[![License](https://img.shields.io/github/license/dluks82/todo-and-devops)](LICENSE)
[![Release](https://img.shields.io/github/v/tag/dluks82/todo-and-devops?label=release&sort=semver)](https://github.com/dluks82/todo-and-devops/tags)
![Node](https://img.shields.io/badge/node-20%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-orange.svg)](https://conventionalcommits.org)
[![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io)

> API de exemplo focada em práticas de DevOps: testes, build, containerização e compose de dev/prod.

## 🚀 Sobre o Projeto

API mínima em Fastify + TypeScript, com ambiente de desenvolvimento via `tsx`, build com `tsc`, testes com Jest e Docker multi-stage.

### 🏗️ Estrutura

```code
todo-and-devops/
├── src/
│   └── server.ts     # Ponto de entrada e rotas básicas
├── dist/             # Código compilado (gerado)
├── docs/             # (Opcional) Documentação adicional
├── Dockerfile        # Build multi-stage (dev/prod)
├── docker-compose.yml# Compose para dev e prod
└── README.md
```

### Integração e Entrega Contínua

O projeto utiliza GitHub Actions para automação de processos de CI/CD.

## 🛠️ Tecnologias Utilizadas

- Fastify (v5)
- TypeScript (tsc)
- Jest (ts-jest)
- ESLint + Prettier
- tsx (dev server com hot-reload)
- Docker + Compose

## 🏷️ Tags da Imagem Docker

- latest: gerada no branch padrão (main).
- <branch>: tag com o nome do branch (ex.: develop).
- <sha>: tag com o short SHA do commit (ex.: sha-abcdef1).
- vX.Y.Z, vX.Y, vX: geradas ao criar tags Git no formato vX.Y.Z.

Exemplos

```bash
# Pull da última imagem da main
docker pull ghcr.io/<owner>/<repo>-api:latest

# Pull da imagem do branch develop
docker pull ghcr.io/<owner>/<repo>-api:develop

# Pull por versão (exige tag git v1.2.3 publicada)
docker pull ghcr.io/<owner>/<repo>-api:v1.2.3
docker pull ghcr.io/<owner>/<repo>-api:v1.2
docker pull ghcr.io/<owner>/<repo>-api:v1
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js v20+
- Docker (opcional para dev/prod com compose)

### Instalação e Desenvolvimento (local)

```bash
git clone https://github.com/dluks82/todo-and-devops.git
cd todo-and-devops
npm ci

# Dev com hot-reload (tsx)
npm run dev

# Build TypeScript
npm run build

# Testes
npm test
```

### Docker / Compose

```bash
# Dev com hot-reload (volume nomeado de node_modules)
docker compose up --build api-dev

# Produção (imagem prod com healthcheck em /health)
docker compose up --build api

# Build manual da imagem prod
docker build --target prod -t todo-and-devops-api:prod .
docker run -p 3000:3000 --rm todo-and-devops-api:prod
```

## 🔗 Endpoints Disponíveis

### Health Check

```
GET /health
```

Resposta: `{ "status": "ok" }`

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

<!-- Sem documentação adicional no momento -->

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
