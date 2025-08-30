export const VERSION = '1.0.0'
export const PROJECT_NAME = 'Todo & DevOps'

export type Status = 'ok' | 'error' | 'pending'

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
