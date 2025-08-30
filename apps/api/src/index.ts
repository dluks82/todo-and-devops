import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'

const app: FastifyInstance = Fastify({ logger: true })

app.register(cors, {
  origin: true,
})

app.register(routes)

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const HOST = process.env.HOST || 'localhost'

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST })
    app.log.info(`Server running on http://${HOST}:${PORT}`)
    app.log.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
