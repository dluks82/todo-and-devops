/**
 * Tipos e constantes para a API
 */

export const VERSION = '0.0.1'
export const PROJECT_NAME = 'Todo & DevOps API'

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
