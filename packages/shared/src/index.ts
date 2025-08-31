import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ler a versão do package.json
const pkgPath = join(__dirname, '..', 'package.json')
const pkgContent = readFileSync(pkgPath, 'utf8')
const pkg = JSON.parse(pkgContent)

export const VERSION = pkg.version
export const PROJECT_NAME = 'Todo & DevOps'

export type Status = 'ok' | 'error' | 'pending'

export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface HealthCheckResult {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
  environment: string
  services?: {
    database?: 'ok' | 'error'
    redis?: 'ok' | 'error'
    external?: 'ok' | 'error'
  }
}
