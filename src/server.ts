import Fastify, { FastifyInstance } from 'fastify'

type HealthResponse = { status: 'ok' }
type RootResponse = { hello: string }

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: true })

  app.get<{ Reply: HealthResponse }>('/health', () => ({ status: 'ok' }))
  app.get<{ Reply: RootResponse }>('/', () => ({
    hello: 'todo-and-devops-api',
  }))

  return app
}

// Only start the server when not running tests
if (process.env.NODE_ENV !== 'test') {
  const app = buildApp()
  const port = Number(process.env.PORT ?? 3000)

  const start: () => Promise<void> = async () => {
    try {
      await app.listen({ port, host: '0.0.0.0' })
      app.log.info(`Server on :${port}`)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
  // Fire and forget
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  start()

  process.on('SIGTERM', () => {
    void (async () => {
      app.log.info('SIGTERM received, closing...')
      await app.close()
      process.exit(0)
    })()
  })
}
