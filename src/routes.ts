import { FastifyInstance } from 'fastify'
import { HealthCheckResult, VERSION } from './types'

export async function routes(app: FastifyInstance) {
  app.get('/health', async (): Promise<HealthCheckResult> => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: VERSION,
      environment: process.env.NODE_ENV || 'development',
    }
  })
}
