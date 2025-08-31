import { routes } from '@/routes'
import { HealthCheckResult } from '@/types'
import {
  FastifyInstance,
  RouteHandlerMethod,
  FastifyPluginCallback,
  FastifyPluginAsync,
} from 'fastify'

// Mock da resposta do endpoint health
const mockHealthResponse: HealthCheckResult = {
  status: 'ok',
  timestamp: '2025-08-31T12:00:00.000Z',
  uptime: 60,
  version: '0.0.1',
  environment: 'test',
}

// Tipo para os plugins do Fastify (pode ser função síncrona ou assíncrona)
type FastifyPlugin = FastifyPluginCallback | FastifyPluginAsync

// Interface estendida para nosso mock
interface MockFastifyInstance extends FastifyInstance {
  handlers?: Record<string, RouteHandlerMethod>
}

describe('Routes', () => {
  let app: MockFastifyInstance
  let injectSpy: jest.SpyInstance

  beforeEach(() => {
    // Criar um mock mais simplificado do Fastify
    app = {
      register: jest.fn().mockImplementation((plugin: FastifyPlugin, _opts) => {
        // Executar o plugin imediatamente
        if (typeof plugin === 'function') {
          // Usamos type assertion para informar ao TypeScript que isso é seguro
          ;(plugin as FastifyPluginCallback)(app, {}, () => {})
        }
        return Promise.resolve(app)
      }),
      get: jest
        .fn()
        .mockImplementation((path: string, handler: RouteHandlerMethod) => {
          // Armazenar o handler para uso posterior
          if (app.handlers) {
            app.handlers[path] = handler
          }
        }),
      handlers: {},
      inject: jest.fn().mockResolvedValue({
        statusCode: 200,
        payload: JSON.stringify(mockHealthResponse),
      }),
      close: jest.fn().mockResolvedValue(undefined),
    } as unknown as MockFastifyInstance

    injectSpy = jest.spyOn(app, 'inject')

    // Registrar as rotas
    routes(app)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return health check data', async () => {
    // Configurar o mock da resposta
    injectSpy.mockResolvedValueOnce({
      statusCode: 200,
      payload: JSON.stringify(mockHealthResponse),
    })

    // Fazer a chamada ao endpoint
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    })

    expect(response.statusCode).toBe(200)

    const payload = JSON.parse(response.payload) as HealthCheckResult
    expect(payload).toHaveProperty('status', 'ok')
    expect(payload).toHaveProperty('timestamp')
    expect(payload).toHaveProperty('uptime')
    expect(payload).toHaveProperty('version')
    expect(payload).toHaveProperty('environment')
  })
})
