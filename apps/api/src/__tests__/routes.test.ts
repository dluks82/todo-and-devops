import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { routes } from '../routes'

describe('Routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = Fastify({ logger: false })
    await app.register(cors, { origin: true })
    await app.register(routes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app.server).get('/non-existent')
      expect(response.status).toBe(404)
    })

    it('should return 404 for POST to /health', async () => {
      const response = await request(app.server).post('/health')
      expect(response.status).toBe(404)
    })

    it('should return 404 for PUT to /health', async () => {
      const response = await request(app.server).put('/health')
      expect(response.status).toBe(404)
    })

    it('should return 404 for DELETE to /health', async () => {
      const response = await request(app.server).delete('/health')
      expect(response.status).toBe(404)
    })
  })

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app.server)
        .get('/health')
        .set('Origin', 'http://localhost:3000')

      expect(response.headers['access-control-allow-origin']).toBeDefined()
    })
  })

  describe('Error handling', () => {
    it('should handle malformed requests gracefully', async () => {
      const response = await request(app.server)
        .get('/health')
        .set('Content-Type', 'application/json')
        .send('invalid json')

      expect(response.status).toBe(200) // Should still work for GET requests
    })
  })
})
