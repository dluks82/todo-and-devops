# 🛠️ Guia de Desenvolvimento

Este documento descreve as ferramentas e configurações de qualidade de código utilizadas no projeto.

## 📋 Ferramentas de Qualidade

### ESLint

- **Versão**: 9.34.0 (mais recente)
- **Configuração**: `eslint.config.js`
- **Propósito**: Análise estática de código JavaScript/TypeScript
- **Uso**: `pnpm lint` ou `pnpm lint:fix`

### Prettier

- **Versão**: 3.6.2 (mais recente)
- **Configuração**: `.prettierrc`
- **Propósito**: Formatação automática de código
- **Uso**: `pnpm format` ou `pnpm format:check`

### TypeScript

- **Versão**: 5.9.2 (mais recente)
- **Configuração**: `tsconfig.json` em cada pacote
- **Propósito**: Verificação de tipos estáticos
- **Uso**: `pnpm typecheck`

### Commitlint

- **Versão**: 19.8.1 (mais recente)
- **Configuração**: `commitlint.config.js`
- **Propósito**: Validação de mensagens de commit
- **Padrão**: Conventional Commits

### Husky

- **Versão**: 9.1.7 (mais recente)
- **Configuração**: `.husky/`
- **Propósito**: Git hooks automatizados
- **Hooks**: commit-msg (validação de commits)

### Commitizen

- **Versão**: 4.3.1
- **Configuração**: `package.json`
- **Propósito**: Interface interativa para commits
- **Uso**: `pnpm commit`

## 🚀 Scripts Disponíveis

### Desenvolvimento

```bash
pnpm dev:api          # Executa apenas a API
pnpm dev              # Executa todos os serviços
```

### Qualidade de Código

```bash
pnpm lint             # Verifica qualidade do código
pnpm lint:fix         # Corrige problemas automaticamente
pnpm format           # Formata o código
pnpm format:check     # Verifica formatação
pnpm typecheck        # Verifica tipos TypeScript
```

### Build e Testes

```bash
pnpm build            # Compila todos os projetos
pnpm test             # Executa testes (futuro)
```

### Commits

```bash
pnpm commit           # Interface interativa para commits
```

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

## 🔧 Configuração do Ambiente

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

# Configure os hooks do Git
pnpm prepare
```

### Verificação Inicial

```bash
# Verifique se tudo está funcionando
pnpm lint
pnpm format
pnpm typecheck
pnpm build
```

## 🎯 Workflow de Desenvolvimento

1. **Crie uma branch** para sua feature
2. **Desenvolva** seguindo os padrões
3. **Execute os checks** antes de commitar:
   ```bash
   pnpm lint
   pnpm format
   pnpm typecheck
   ```
4. **Faça o commit** usando o commitizen:
   ```bash
   pnpm commit
   ```
5. **Push** para sua branch
6. **Abra um Pull Request**

## 🚨 Troubleshooting

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
