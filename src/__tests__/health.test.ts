import { routes } from '@/routes'
import { FastifyInstance } from 'fastify'

describe('Health Check', () => {
  let app: FastifyInstance

  beforeEach(() => {
    app = {
      get: jest.fn(),
    } as unknown as FastifyInstance
  })

  it('should register the health endpoint', async () => {
    await routes(app)
    expect(app.get).toHaveBeenCalledWith('/health', expect.any(Function))
  })
})
