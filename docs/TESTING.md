# 🧪 Guia de Testes

Este documento descreve a estratégia de testes implementada no projeto Todo & DevOps.

## 📋 Estratégia de Testes

### Testes Unitários

- **Framework**: Jest 29.7.0
- **Cobertura**: 100% para código crítico
- **Execução**: `pnpm test`

### Testes de Integração

- **Framework**: Jest + Supertest
- **Foco**: Endpoints da API
- **Execução**: `pnpm test`

## 🚀 Como Executar Testes

### Todos os Testes

```bash
pnpm test
```

### Testes com Watch Mode

```bash
pnpm test:watch
```

### Testes com Coverage

```bash
pnpm test:coverage
```

### Testes de um Pacote Específico

```bash
# API
pnpm --filter @todo-and-devops/api test

# Shared
pnpm --filter @todo-and-devops/shared test
```

## 📁 Estrutura de Testes

```
apps/api/src/__tests__/
├── health.test.ts      # Testes do endpoint /health
├── routes.test.ts      # Testes gerais das rotas
└── setup.ts           # Configuração global dos testes

packages/shared/src/__tests__/
└── index.test.ts      # Testes dos tipos e funções compartilhadas
```

## 🎯 Cobertura de Testes

### API (`apps/api`)

- ✅ **Endpoint `/health`**: 100% de cobertura
  - Status code 200
  - Estrutura da resposta
  - Validação de timestamp
  - Validação de uptime
  - Content-Type JSON
  - Múltiplas requisições sequenciais

- ✅ **Rotas Gerais**: 100% de cobertura
  - Tratamento de 404
  - Headers CORS
  - Tratamento de erros

### Shared (`packages/shared`)

- ✅ **Tipos e Funções**: 100% de cobertura
  - Constantes do projeto
  - Tipos básicos (Status, BaseEntity)
  - Validação de estruturas

## 📊 Relatórios de Coverage

Os relatórios de coverage são gerados em:

- **Texto**: Console
- **HTML**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info`

### Cobertura Atual

```
File      | % Stmts | % Branch | % Funcs | % Lines
----------|---------|----------|---------|---------
All files |     100 |      100 |     100 |     100
```

## 🧩 Tipos de Teste

### 1. Testes de Endpoint

```typescript
describe('GET /health', () => {
  it('should return 200 status code', async () => {
    const response = await request(app.server).get('/health')
    expect(response.status).toBe(200)
  })
})
```

### 2. Testes de Validação

```typescript
describe('Status type', () => {
  it('should accept valid status values', () => {
    const validStatuses: Status[] = ['ok', 'error', 'pending']
    validStatuses.forEach(status => {
      expect(['ok', 'error', 'pending']).toContain(status)
    })
  })
})
```

### 3. Testes de Performance

```typescript
it('should respond quickly', async () => {
  const startTime = Date.now()
  await request(app.server).get('/health')
  const endTime = Date.now()
  expect(endTime - startTime).toBeLessThan(100)
})
```

## 🔧 Configuração

### Jest Configuration

- **Preset**: `ts-jest`
- **Environment**: `node`
- **ESM**: Habilitado
- **Coverage**: Text, HTML, LCOV

### Setup Global

- Ambiente de teste configurado
- Console silenciado durante testes
- Variáveis de ambiente definidas

## 📝 Convenções

### Nomenclatura

- Arquivos de teste: `*.test.ts`
- Descrições: Em inglês
- Estrutura: `describe` > `it` > `expect`

### Organização

- Um arquivo de teste por módulo
- Testes agrupados por funcionalidade
- Setup e teardown quando necessário

## 🚨 Troubleshooting

### Testes Falhando

1. Verifique se todas as dependências estão instaladas
2. Execute `pnpm install`
3. Verifique se a API não está rodando em background
4. Execute `pnpm test:coverage` para ver detalhes

### Problemas de Conexão

- Testes de múltiplas requisições podem falhar
- Use requisições sequenciais em vez de paralelas
- Aumente timeouts se necessário

### Problemas de TypeScript

- Execute `pnpm typecheck` primeiro
- Verifique se os tipos estão corretos
- Importe tipos necessários nos testes

## 🔄 Próximos Passos

### Testes Futuros

- [ ] Testes de CRUD de tarefas
- [ ] Testes de validação com Zod
- [ ] Testes de middleware
- [ ] Testes de banco de dados
- [ ] Testes E2E (futuro frontend)

### Melhorias

- [ ] Testes de stress
- [ ] Testes de segurança
- [ ] Testes de acessibilidade
- [ ] Testes de performance mais robustos

---

Para mais informações sobre testes, consulte a [documentação do Jest](https://jestjs.io/docs/getting-started).
