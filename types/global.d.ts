declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PORT?: string
      HOST?: string
      DATABASE_URL?: string
      JWT_SECRET?: string
      CORS_ORIGIN?: string
    }
  }
}

export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test'
  PORT: number
  DATABASE_URL?: string
  JWT_SECRET?: string
  CORS_ORIGIN?: string
}

export interface AppConfig {
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

export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ValidationError {
  field: string
  message: string
  value?: unknown
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export interface MiddlewareConfig {
  cors: {
    origin: string | string[]
    credentials: boolean
  }
  rateLimit?: {
    windowMs: number
    max: number
  }
}

export interface HealthCheckResult {
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
