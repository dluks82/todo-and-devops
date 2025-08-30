import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import request from 'supertest'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { routes } from '../routes'

describe('Health Endpoint', () => {
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

  describe('GET /health', () => {
    it('should return 200 status code', async () => {
      const response = await request(app.server).get('/health')
      expect(response.status).toBe(200)
    })

    it('should return correct response structure', async () => {
      const response = await request(app.server).get('/health')
      expect(response.body).toHaveProperty('status')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
    })

    it('should return status as "ok"', async () => {
      const response = await request(app.server).get('/health')
      expect(response.body.status).toBe('ok')
    })

    it('should return valid timestamp', async () => {
      const response = await request(app.server).get('/health')
      const timestamp = new Date(response.body.timestamp)
      expect(timestamp.getTime()).not.toBeNaN()
      expect(timestamp).toBeInstanceOf(Date)
    })

    it('should return uptime as number', async () => {
      const response = await request(app.server).get('/health')
      expect(typeof response.body.uptime).toBe('number')
      expect(response.body.uptime).toBeGreaterThan(0)
    })

    it('should return JSON content type', async () => {
      const response = await request(app.server).get('/health')
      expect(response.headers['content-type']).toContain('application/json')
    })

    it('should handle multiple sequential requests', async () => {
      for (let i = 0; i < 3; i++) {
        const response = await request(app.server).get('/health')
        expect(response.status).toBe(200)
        expect(response.body.status).toBe('ok')
      }
    })
  })
})
