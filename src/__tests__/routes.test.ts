import { buildApp } from '../server'

describe('Root endpoint', () => {
  it('GET / should describe API metadata', async () => {
    const app = await buildApp()
    const res = await app.inject({ method: 'GET', url: '/' })
    expect(res.statusCode).toBe(200)
    const payload = res.json() as {
      name: string
      version: string
      description: string
      docsUrl: string
    }
    const expected = {
      name: process.env.API_NAME ?? 'Todo & DevOps API',
      version:
        process.env.API_VERSION ?? process.env.npm_package_version ?? '1.0.0',
      description:
        process.env.API_DESCRIPTION ?? 'API para projeto Todo & DevOps',
      docsUrl: '/docs',
    }
    expect(payload).toMatchObject(expected)
    await app.close()
  })
})
