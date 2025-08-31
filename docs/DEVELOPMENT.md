# 🛠️ Guia de Desenvolvimento

Este documento descreve as ferramentas e configurações de qualidade de código utilizadas no projeto.

## 📋 Ferramentas de Qualidade

### ESLint

- **Versão**: 9.34.0 (mais recente)
- **Configuração**: `eslint.config.js`
- **Propósito**: Análise estática de código JavaScript/TypeScript
- **Uso**: `yarn lint` ou `yarn lint:fix`

### Prettier

- **Versão**: 3.6.2 (mais recente)
- **Configuração**: `.prettierrc`
- **Propósito**: Formatação automática de código
- **Uso**: `yarn format` ou `yarn format:check`

### TypeScript

- **Versão**: 5.3.0 (mais recente)
- **Configuração**: `tsconfig.json`
- **Propósito**: Verificação de tipos estáticos
- **Módulo**: NodeNext com aliases de path (@/\*)

### Commitlint

- **Versão**: 19.0.0 (mais recente)
- **Configuração**: `commitlint.config.js`
- **Propósito**: Padronizar mensagens de commit
- **Uso**: Integrado com Husky (git commit)

### Husky

- **Versão**: 9.0.0 (mais recente)
- **Configuração**: `.husky/`
- **Propósito**: Git hooks para automação de tarefas
- **Hooks**:
  - `pre-commit`: Executa lint-staged
  - `commit-msg`: Verifica mensagem de commit com commitlint

### Lint-Staged

- **Versão**: 15.2.9 (mais recente)
- **Configuração**: `lint-staged` no package.json
- **Propósito**: Executar linters apenas em arquivos staged
- **Uso**: Automático via Husky pre-commit

### Commitizen

- **Versão**: 4.3.0
- **Configuração**: `package.json`
- **Propósito**: Interface interativa para commits
- **Uso**: `yarn commit`

## �️ Estrutura do Projeto

### Diretórios Principais

```
todo-and-devops/
├── src/              # Código fonte da API
│   ├── index.ts      # Ponto de entrada da aplicação
│   ├── routes.ts     # Definição de rotas
│   └── types.ts      # Tipos e interfaces
├── dist/             # Código compilado (gerado)
├── docs/             # Documentação do projeto
└── .github/          # GitHub Actions e configurações
```

### Aliases de Path

O projeto utiliza aliases de path para melhorar a legibilidade das importações:

```typescript
// Ao invés de:
import { MeuTipo } from '../../../types'

// Use:
import { MeuTipo } from '@/types'
```

Configuração:

- **TypeScript**: Configurado em `tsconfig.json` com `paths`
- **Runtime**: Via `module-alias` no `index.ts`

## 📦 Gerenciamento de Pacotes

O projeto utiliza o Yarn como gerenciador de pacotes:

- **Versão**: 1.22.x
- **Configuração**: `.yarnrc`
- **Scripts**: Definidos no `package.json`

### Scripts Principais

- `yarn dev`: Executa o projeto em modo de desenvolvimento com hot-reload
- `yarn build`: Compila o projeto para produção
- `yarn start`: Inicia o projeto compilado
- `yarn test`: Executa testes
- `yarn lint`: Verifica problemas de código
- `yarn format`: Formata automaticamente o código

## 📝 Padrões de Commit

O projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

### Tipos de Commit

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação de código
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Testes
- `build`: Build do sistema
- `ci`: Integração contínua
- `chore`: Tarefas de manutenção
- `revert`: Reverter commit

### Exemplos

```bash
feat: adiciona endpoint de listagem de tarefas
fix: corrige validação de dados de entrada
docs: atualiza documentação da API
style: formata código com prettier
refactor: reorganiza estrutura de pastas
test: adiciona testes para endpoint health
```

## � Workflow de Desenvolvimento

1. **Instalação**: `yarn install`
2. **Desenvolvimento**: `yarn dev`
3. **Validação**:
   - `yarn lint`
   - `yarn format:check`
   - `yarn test`
4. **Build**: `yarn build`
5. **Verificação de Build**: `yarn start`

## 🐳 Docker

O projeto inclui configuração Docker para desenvolvimento e produção:

- **Build**: `yarn docker:build`
- **Execução**: `yarn docker:run`
- **Configuração**: Multi-stage build no `Dockerfile`

---

⚠️ **Nota**: Mantenha este documento atualizado conforme o projeto evolui.

### ESLint não encontra configuração

- Verifique se o arquivo `eslint.config.js` existe
- Certifique-se de que as dependências estão instaladas

### TypeScript não compila

- Execute `pnpm typecheck` para ver erros específicos
- Verifique se os tipos estão corretos

### Commit rejeitado

- Use `pnpm commit` para interface interativa
- Siga o padrão Conventional Commits

### Prettier não formata

- Execute `pnpm format` para formatação automática
- Verifique se o arquivo `.prettierrc` existe

---

Para mais informações, consulte a documentação de cada ferramenta ou abra uma issue.
