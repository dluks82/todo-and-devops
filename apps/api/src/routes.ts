import { FastifyInstance } from 'fastify'
import { HealthCheckResult } from '../../../types/global'

export async function routes(app: FastifyInstance) {
  app.get('/health', async (): Promise<HealthCheckResult> => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    }
  })
}
