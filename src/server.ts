import Fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'

import { swaggerPlugin } from './plugins/swagger.js'
import { DEFAULT_TODO_LIMIT, todosPlugin } from './routes/todos.js'

type HealthResponse = { status: 'ok' }
type RootResponse = {
  name: string
  version: string
  description: string
  docsUrl: string
}

const parseTodoLimit = (value: string | undefined): number => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed <= 0) {
    return DEFAULT_TODO_LIMIT
  }
  return parsed
}

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
    name: { type: 'string' },
    version: { type: 'string' },
    description: { type: 'string' },
    docsUrl: { type: 'string', format: 'uri-reference' },
  },
  required: ['name', 'version', 'description', 'docsUrl'],
  additionalProperties: false,
} as const

const apiMetadata: RootResponse = {
  name: process.env.API_NAME ?? 'Todo & DevOps API',
  version:
    process.env.API_VERSION ?? process.env.npm_package_version ?? '1.0.0',
  description: process.env.API_DESCRIPTION ?? 'API para projeto Todo & DevOps',
  docsUrl: '/docs',
}

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: true })

  await app.register(swaggerPlugin)

  await app.register(todosPlugin, {
    maxItems: parseTodoLimit(process.env.TODO_MAX_ITEMS),
  })

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
    () => ({ ...apiMetadata })
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
