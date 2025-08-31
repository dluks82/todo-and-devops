import { routes } from '@/routes'
import Fastify, { FastifyInstance } from 'fastify'

describe('Routes', () => {
  let app: FastifyInstance

  beforeEach(async () => {
    app = Fastify()
    await app.register(routes)
  })

  afterEach(() => {
    app.close()
  })

  it('should return health check data', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.payload)
    expect(payload).toHaveProperty('status', 'ok')
    expect(payload).toHaveProperty('timestamp')
    expect(payload).toHaveProperty('uptime')
    expect(payload).toHaveProperty('version')
    expect(payload).toHaveProperty('environment')
  })
})
