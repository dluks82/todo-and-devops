# 📝 Guia de Tipos TypeScript

Este documento descreve os tipos TypeScript utilizados no projeto Todo & DevOps.

## 🎯 Tipos Globais

### Variáveis de Ambiente

```typescript
interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  DATABASE_URL?: string
  JWT_SECRET?: string
  CORS_ORIGIN?: string
}
```

### Configuração da Aplicação

```typescript
interface AppConfig {
  port: number
  host: string
  cors: {
    origin: string | string[]
    credentials: boolean
  }
  database?: {
    url: string
  }
  jwt?: {
    secret: string
    expiresIn: string
  }
}
```

### Respostas da API

```typescript
interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}
```

### Paginação

```typescript
interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}
```

### Validação

```typescript
interface ValidationError {
  field: string
  message: string
  value?: unknown
}

interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}
```

### Health Check

```typescript
interface HealthCheckResult {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
  environment: string
  services?: {
    database?: 'ok' | 'error'
    redis?: 'ok' | 'error'
    external?: 'ok' | 'error'
  }
}
```

## 📦 Tipos do Pacote Shared

### Constantes

```typescript
const VERSION = '1.0.0'
const PROJECT_NAME = 'Todo & DevOps'
```

### Status

```typescript
type Status = 'ok' | 'error' | 'pending'
```

### BaseEntity

```typescript
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
```

## 📋 Configuração TypeScript

### tsconfig.json Raiz

- **Target**: ES2022
- **Module**: ESNext
- **Strict**: true
- **Types**: ["node"]
- **Paths**: Configurados para monorepo

### tsconfig.json da API

- **Types**: ["node", "jest"]
- **Paths**: Configurados para shared
- **Source Maps**: Habilitados

### tsconfig.json do Shared

- **Types**: ["node", "jest"]
- **Declaration**: true
- **Source Maps**: Habilitados

## 🎨 Boas Práticas

### 1. Uso de Tipos Union

```typescript
type Status = 'pending' | 'in-progress' | 'completed' | 'cancelled'
```

### 2. Tipos Condicionais

```typescript
type EntityWithUser<T> = T & { user: User }
type EntityWithoutId<T> = Omit<T, 'id'>
```

### 3. Tipos Genéricos

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>
  create(data: Omit<T, 'id'>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}
```

### 4. Tipos de Função

```typescript
type Validator<T> = (data: unknown) => data is T
type Transformer<T, U> = (data: T) => U
type Filter<T> = (data: T) => boolean
```

## 🚀 Extensões Futuras

### Tipos para Autenticação

```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: Date
}

interface AuthToken {
  token: string
  expiresAt: Date
  userId: string
}
```

### Tipos para Notificações

```typescript
interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  userId: string
  read: boolean
  createdAt: Date
}
```

### Tipos para Auditoria

```typescript
interface AuditLog {
  id: string
  action: 'create' | 'update' | 'delete' | 'read'
  resource: string
  resourceId: string
  userId: string
  changes?: Record<string, unknown>
  timestamp: Date
}
```

## 🔍 Verificação de Tipos

### Comandos Úteis

```bash
# Verificar tipos
pnpm typecheck

# Build com verificação de tipos
pnpm build

# Verificar tipos em modo watch
pnpm --filter @todo-and-devops/api typecheck --watch
```

### IDE Support

- **VS Code**: Configurado para TypeScript
- **IntelliSense**: Funcionando com todos os tipos
- **Auto-complete**: Disponível para todos os tipos
- **Error checking**: Em tempo real

---

Para mais informações sobre TypeScript, consulte a [documentação oficial](https://www.typescriptlang.org/docs/).
