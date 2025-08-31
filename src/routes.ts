import { FastifyInstance } from 'fastify'
import { HealthCheckResult, VERSION } from '@/types'

export function routes(app: FastifyInstance): void {
  app.get('/health', (): Promise<HealthCheckResult> => {
    return Promise.resolve({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: VERSION,
      environment: process.env.NODE_ENV || 'development',
    })
  })
}
