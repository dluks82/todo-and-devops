# 📋 Todo API

> Projeto desenvolvido como prática para a disciplina de DevOps em graduação de Análise e Desenvolvimento de Sistemas (PUC-PR).

## 🚀 Sobre o Projeto

Uma API simples para gerenciamento de tarefas (Todo App) com foco em práticas de DevOps. O projeto demonstra conceitos de CI/CD, containerização, orquestração e automação.

### 🏗️ Arquitetura

```code
todo-and-devops/
├── src/              # Código fonte da API
│   ├── index.ts      # Ponto de entrada da aplicação
│   ├── routes.ts     # Definição de rotas
│   └── types.ts      # Tipos e interfaces
├── dist/             # Código compilado (gerado)
├── docs/             # Documentação do projeto
├── Dockerfile        # Configuração do Docker
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

## 🛠️ Tecnologias Utilizadas

### Backend

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para JavaScript
- **Zod** - Validação de schemas
- **npm** - Gerenciador de pacotes

## 🚀 Como Executar

### Pré-requisitos

- Node.js v20+
- npm v10+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/dluks82/todo-and-devops.git
cd todo-and-devops

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Executar em modo de desenvolvimento com hot-reload
npm run dev

# Build do projeto
npm run build

# Verificar tipos
npm run typecheck
```

### Docker

```bash
# Construir a imagem Docker
npm run docker:build

# Executar o container Docker
npm run docker:run
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

### ✅ Etapa 1 - Setup Inicial

- [x] Estrutura básica da API
- [x] Endpoint `/health` funcional
- [x] Configuração TypeScript
- [x] Documentação inicial

### ✅ Etapa 2 - DevOps

- [x] Dockerização
- [x] CI/CD com GitHub Actions
- [x] Deploy com Coolify
- [x] Análise de segurança com CodeQL

### ✅ Etapa 3 - Simplificação da Estrutura

- [x] Migração de monorepo para projeto independente
- [x] Simplificação do processo de build
- [x] Ajustes na configuração do TypeScript
- [x] Atualização da documentação

### 🔄 Próximas Etapas

- [ ] **Etapa 4**: CRUD completo de tarefas
- [ ] **Etapa 5**: Integração com banco de dados
- [ ] **Etapa 6**: Kubernetes
- [ ] **Etapa 7**: Monitoramento e logs
- [ ] **Etapa 6**: Monitoramento e logs

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com watch mode
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

### Cobertura Atual

- **API**: 100% de cobertura
- **Total**: 17 testes passando

Veja o [Guia de Testes](./docs/TESTING.md) para mais detalhes.

## 📚 Documentação

- [Guia de Contribuição](./docs/CONTRIBUTING.md)
- [Guia de Desenvolvimento](./docs/DEVELOPMENT.md)
- [Guia de Testes](./docs/TESTING.md)
- [Guia de Tipos TypeScript](./docs/TYPES.md)
- [Conventional Commits](./docs/COMMITS.md)
- [CI/CD](./docs/CICD.md)
- [Coolify](./docs/COOLIFY.md)
- [Arquitetura](./docs/ARCHITECTURE.md) (em desenvolvimento)
- [API Reference](./docs/API.md) (em desenvolvimento)

> Nota: Os documentos marcados como "em desenvolvimento" serão adicionados nas próximas etapas do projeto.

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
