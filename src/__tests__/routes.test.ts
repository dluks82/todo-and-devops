import { buildApp } from '../server'

describe('Root endpoint', () => {
  it('GET / should return hello', async () => {
    const app = buildApp()
    const res = await app.inject({ method: 'GET', url: '/' })
    expect(res.statusCode).toBe(200)
    const payload = res.json() as { hello: string }
    expect(payload.hello).toBe('ts-world')
    await app.close()
  })
})
