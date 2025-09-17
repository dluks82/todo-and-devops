import { buildApp } from '../server'

describe('Documentação Swagger', () => {
  it('GET /docs/json deve expor a especificação OpenAPI', async () => {
    const app = await buildApp()
    await app.ready()

    const res = await app.inject({ method: 'GET', url: '/docs/json' })

    expect(res.statusCode).toBe(200)
    const payload = res.json() as { openapi?: string }
    expect(payload.openapi).toMatch(/^3\./)

    await app.close()
  })
})
