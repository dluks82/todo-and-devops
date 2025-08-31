// Configurar aliases de caminho
import 'module-alias/register'

import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { routes } from '@/routes'
import { PROJECT_NAME, VERSION } from '@/types'

const app: FastifyInstance = Fastify({
  logger: true,
  disableRequestLogging: process.env.NODE_ENV === 'production',
})

// Registrar plugins
app.register(cors, {
  origin: true,
})

// Registrar rotas
app.register(routes)

// Configuração do servidor
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
const HOST = process.env.HOST || '0.0.0.0'

// Iniciar o servidor
const start = async (): Promise<void> => {
  try {
    await app.listen({ port: PORT, host: HOST })
    app.log.info(`${PROJECT_NAME} v${VERSION}`)
    app.log.info(`Server running on http://${HOST}:${PORT}`)
    app.log.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

void start()
