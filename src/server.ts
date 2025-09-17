import Fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'

import { swaggerPlugin } from './plugins/swagger'

type HealthResponse = { status: 'ok' }
type RootResponse = { hello: string }

const healthResponseSchema = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['ok'] },
  },
  required: ['status'],
  additionalProperties: false,
} as const

const rootResponseSchema = {
  type: 'object',
  properties: {
    hello: { type: 'string' },
  },
  required: ['hello'],
  additionalProperties: false,
} as const

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true })

  await app.register(swaggerPlugin)

  app.get<{ Reply: HealthResponse }>(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Retorna o status de saúde da API',
        response: {
          200: {
            description: 'Status atual da API',
            ...healthResponseSchema,
          },
        },
      },
    },
    () => ({ status: 'ok' })
  )
  app.get<{ Reply: RootResponse }>(
    '/',
    {
      schema: {
        tags: ['Root'],
        summary: 'Endpoint padrão da API',
        response: {
          200: {
            description: 'Informações básicas da API',
            ...rootResponseSchema,
          },
        },
      },
    },
    () => ({
      hello: 'todo-and-devops-api',
    })
  )

  return app
}

// Only start the server when not running tests
if (process.env.NODE_ENV !== 'test') {
  let appInstance: FastifyInstance | null = null

  const start: () => Promise<void> = async () => {
    try {
      appInstance = await buildApp()
      const port = Number(process.env.PORT ?? 3000)
      await appInstance.listen({ port, host: '0.0.0.0' })
      appInstance.log.info(`Server on :${port}`)
    } catch (err) {
      appInstance?.log.error(err)
      process.exit(1)
    }
  }
  // Fire and forget
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  start()

  process.on('SIGTERM', () => {
    void (async () => {
      if (!appInstance) return
      appInstance.log.info('SIGTERM received, closing...')
      await appInstance.close()
      process.exit(0)
    })()
  })
}
