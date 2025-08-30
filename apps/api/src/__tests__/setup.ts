import { jest } from '@jest/globals'

// Setup global para testes
process.env.NODE_ENV = 'test'

// Configurações globais para testes
global.console = {
  ...console,
  // Silencia logs durante testes
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}
