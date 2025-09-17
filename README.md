# 📋 Todo API

[![CI](https://github.com/dluks82/todo-and-devops/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/ci.yml)
[![CodeQL](https://github.com/dluks82/todo-and-devops/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/codeql.yml)
[![Coolify Deploy](https://github.com/dluks82/todo-and-devops/actions/workflows/coolify-deploy.yml/badge.svg?branch=main)](https://github.com/dluks82/todo-and-devops/actions/workflows/coolify-deploy.yml)
[![GHCR](https://img.shields.io/badge/ghcr.io%2Fdluks82%2Ftodo--and--devops--api-available-blue?logo=github)](https://github.com/dluks82?tab=packages&repo_name=todo-and-devops)
[![API](https://img.shields.io/website?url=https%3A%2F%2Fapi-todoanddevops.11051982.xyz%2Fhealth&label=API&up_message=online&down_message=offline)](https://api-todoanddevops.11051982.xyz/health)
[![License](https://img.shields.io/github/license/dluks82/todo-and-devops)](LICENSE)
[![Release](https://img.shields.io/github/v/tag/dluks82/todo-and-devops?label=release&sort=semver)](https://github.com/dluks82/todo-and-devops/tags)
![Node](https://img.shields.io/badge/node-20%2B-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-orange.svg)](https://conventionalcommits.org)
[![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io)

> API de exemplo focada em práticas de DevOps: testes, build, containerização e compose de dev/prod com suporte a variáveis de ambiente.

## 🚀 Sobre o Projeto

API mínima em Fastify + TypeScript, com ambiente de desenvolvimento via `tsx`, build com `tsc`, testes com Jest e Docker multi-stage. O projeto inclui configuração completa para desenvolvimento com Docker, suporte a variáveis de ambiente via `.env` e scripts de conveniência para operações comuns.

### 📋 Guia de Desenvolvimento

Para detalhes sobre o fluxo de desenvolvimento, configuração do ambiente e comandos disponíveis, consulte o [Guia de Desenvolvimento](docs/DESENVOLVIMENTO.md).

### 🏗️ Estrutura

```code
todo-and-devops/
├── src/
│   ├── plugins/
│   │   └── swagger.ts # Configuração do Swagger/OpenAPI
│   └── server.ts      # Ponto de entrada e rotas básicas
├── dist/             # Código compilado (gerado)
├── docs/             # Documentação adicional
│   └── DESENVOLVIMENTO.md # Guia de fluxo de desenvolvimento
├── .env              # Variáveis de ambiente (local)
├── .env.example      # Exemplo de variáveis de ambiente
├── Dockerfile        # Build multi-stage (dev/prod)
├── docker-compose.yml# Compose para dev e prod
└── README.md
```

### 🔧 Configuração com Variáveis de Ambiente

O projeto utiliza o pacote `dotenv` para gerenciar variáveis de ambiente. As principais configurações são:

- `PORT`: Porta em que o servidor será executado (padrão: 3010)
- `NODE_ENV`: Ambiente de execução (`development`, `test`, `production`)

### 🚀 Início Rápido

Para começar a desenvolver rapidamente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/dluks82/todo-and-devops.git
   cd todo-and-devops
   ```

2. Inicie o ambiente de desenvolvimento com Docker:

   ```bash
   npm run docker:dev
   ```

3. Acesse a API:
   - Endpoint principal: `http://localhost:3000`
   - Verificação de saúde: `http://localhost:3000/health`
   - Documentação Swagger UI: `http://localhost:3000/docs`

Veja o [Guia de Desenvolvimento](docs/DESENVOLVIMENTO.md) para mais opções.

### 🐳 Docker

O projeto inclui configurações Docker otimizadas para desenvolvimento e produção:

- **Ambiente de Desenvolvimento**: Hot-reload com montagem de volumes para desenvolvimento em tempo real
- **Ambiente de Produção**: Imagem otimizada e leve com apenas as dependências necessárias
- **Scripts de Conveniência**: Diversos comandos npm para facilitar operações com Docker

## 🛠️ Tecnologias Utilizadas

- Fastify (v5)
- TypeScript (tsc)
- Jest (ts-jest)
- ESLint + Prettier
- tsx (dev server com hot-reload)
- Docker + Compose
- dotenv (gerenciamento de variáveis de ambiente)
- @fastify/swagger e @fastify/swagger-ui (documentação automática)

### 🌐 Configuração da Documentação em Produção

Por padrão a especificação usa o próprio host da requisição. Para exibir um endereço específico (por exemplo, um domínio público), defina as variáveis:

- `SWAGGER_SERVER_URL`: URL base a ser exibida nos servidores do OpenAPI.
- `SWAGGER_SERVER_DESCRIPTION`: Descrição opcional desse servidor (padrão: "Servidor configurado via variável de ambiente").

## 📄 Licença

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

## 👤 Autor

[Diogo Oliveira](https://github.com/dluks82)
