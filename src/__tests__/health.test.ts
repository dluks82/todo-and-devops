import { buildApp } from '../server'

describe('Health endpoint', () => {
  it('GET /health should return status ok', async () => {
    const app = buildApp()
    const res = await app.inject({ method: 'GET', url: '/health' })
    expect(res.statusCode).toBe(200)
    const payload = res.json() as { status: string }
    expect(payload.status).toBe('ok')
    await app.close()
  })
})
