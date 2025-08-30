export const VERSION = '1.0.0'
export const PROJECT_NAME = 'Todo & DevOps'

export type Status = 'ok' | 'error' | 'pending'

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
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
