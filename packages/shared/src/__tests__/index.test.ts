import { describe, it, expect } from '@jest/globals'
import { VERSION, PROJECT_NAME, Status, BaseEntity } from '../index'

describe('Shared Package', () => {
  describe('Constants', () => {
    it('should have correct version', () => {
      expect(VERSION).toBe('0.0.1')
    })

    it('should have correct project name', () => {
      expect(PROJECT_NAME).toBe('Todo & DevOps')
    })
  })

  describe('Status type', () => {
    it('should accept valid status values', () => {
      const validStatuses: Status[] = ['ok', 'error', 'pending']

      validStatuses.forEach(status => {
        expect(typeof status).toBe('string')
        expect(['ok', 'error', 'pending']).toContain(status)
      })
    })
  })

  describe('BaseEntity interface', () => {
    it('should have correct structure', () => {
      const entity: BaseEntity = {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(entity).toHaveProperty('id')
      expect(entity).toHaveProperty('createdAt')
      expect(entity).toHaveProperty('updatedAt')
      expect(typeof entity.id).toBe('string')
      expect(entity.createdAt).toBeInstanceOf(Date)
      expect(entity.updatedAt).toBeInstanceOf(Date)
    })
  })
})
