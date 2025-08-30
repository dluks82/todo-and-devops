# 📋 Todo & DevOps - Monorepo

> Projeto desenvolvido como prática para a disciplina de DevOps em graduação de Análise e Desenvolvimento de Sistemas (PUC-PR).

## 🚀 Sobre o Projeto

Este é um monorepo que contém uma aplicação completa de gerenciamento de tarefas (Todo App) com foco em práticas de DevOps. O projeto está estruturado em etapas incrementais para demonstrar conceitos de CI/CD, containerização, orquestração e automação.

### 🏗️ Arquitetura

```
todo-and-devops/
├── apps/
│   ├── api/          # Backend API (Fastify + TypeScript)
│   └── web/          # Frontend (futuro - React/Next.js)
├── packages/
│   └── shared/       # Tipos e utilitários compartilhados
├── docs/             # Documentação do projeto
└── .github/          # GitHub Actions e configurações
```

### Integração e Entrega Contínua

O projeto utiliza GitHub Actions para automação de processos de CI/CD:

- **CI**: Validação de código, testes e análise de segurança
- **CD**: Construção e publicação de imagens Docker
- **CD**: Deploy automático para o Coolify

[Documentação de CI/CD](docs/CICD.md)

### Deploy com Coolify

O projeto está configurado para deploy automático usando Coolify, uma plataforma de auto-hospedagem:

- **Build automático**: Imagens Docker construídas no GitHub Actions
- **Deploy automático**: Webhook para atualização da aplicação no Coolify
- **Containerização**: Gerenciamento simplificado via Coolify

[Documentação do Coolify](docs/COOLIFY.md)

### Deploy com Coolify

O projeto está configurado para deploy automático usando Coolify, uma plataforma de auto-hospedagem.

- **Build automático**: Imagens Docker construídas no GitHub Actions
- **Deploy automático**: Webhook para atualização da aplicação no Coolify
- **Containerização**: Gerenciamento simplificado via Coolify

[Documentação do Coolify](docs/COOLIFY.md)

## 🛠️ Tecnologias Utilizadas

### Backend

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para JavaScript
- **Zod** - Validação de schemas
- **pnpm** - Gerenciador de pacotes rápido

### DevOps

- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **Coolify** - Plataforma de deploy auto-hospedada

## 📦 Estrutura do Monorepo

### Apps

- **API** (`apps/api/`): Servidor REST API com Fastify
- **Web** (`apps/web/`): Frontend (será desenvolvido posteriormente)

### Packages

- **Shared** (`packages/shared/`): Tipos e utilitários compartilhados entre apps

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- pnpm 9.0.0+

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd todo-and-devops

# Instale as dependências
pnpm install
```

### Desenvolvimento

```bash
# Executar apenas a API
pnpm dev:api

# Executar todos os serviços
pnpm dev

# Build de todos os projetos
pnpm build

# Verificar tipos
pnpm typecheck
```

### Endpoints Disponíveis

#### Health Check

```bash
GET /health
```

**Resposta:**

```json
{
  "status": "ok",
  "timestamp": "2025-08-26T03:22:39.582Z",
  "uptime": 10.378373916
}
```

## 📋 Roadmap

### ✅ Etapa 1 - Setup Inicial (Atual)

- [x] Configuração do monorepo com pnpm
- [x] Estrutura básica da API
- [x] Endpoint `/health` funcional
- [x] Configuração TypeScript
- [x] Documentação inicial

### 🔄 Próximas Etapas

- [ ] **Etapa 2**: CRUD completo de tarefas
- [ ] **Etapa 3**: Frontend básico
- [ ] **Etapa 4**: Dockerização
- [ ] **Etapa 5**: CI/CD com GitHub Actions
- [ ] **Etapa 6**: Kubernetes
- [ ] **Etapa 7**: Monitoramento e logs

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes com watch mode
pnpm test:watch

# Executar testes com coverage
pnpm test:coverage
```

### Cobertura Atual

- **API**: 100% de cobertura
- **Shared**: 100% de cobertura
- **Total**: 17 testes passando

Veja o [Guia de Testes](./docs/TESTING.md) para mais detalhes.

## 📚 Documentação

- [Guia de Contribuição](./docs/CONTRIBUTING.md)
- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Guia de Testes](./docs/TESTING.md)
- [Guia de Tipos TypeScript](./docs/TYPES.md)
- [Arquitetura](./docs/ARCHITECTURE.md) (futuro)
- [API Reference](./docs/API.md) (futuro)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Diogo Oliveira** - [dluks82@gmail.com](mailto:dluks82@gmail.com)

**GitHub**: [@dluks82](https://github.com/dluks82)

---

⭐ Se este projeto te ajudou, deixe uma estrela!
