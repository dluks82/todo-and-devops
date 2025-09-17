import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

const plugin: FastifyPluginAsync = async app => {
  const swaggerBaseUrl = process.env.SWAGGER_SERVER_URL
  const swaggerServerDescription =
    process.env.SWAGGER_SERVER_DESCRIPTION ??
    'Servidor configurado via variável de ambiente'

  const openapiConfig: FastifyDynamicSwaggerOptions['openapi'] = {
    info: {
      title: 'Todo & DevOps API',
      description: 'Documentação da API Todo & DevOps.',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Health',
        description: 'Monitoramento da disponibilidade da API',
      },
      { name: 'Root', description: 'Informações gerais da aplicação' },
      { name: 'Todos', description: 'Gerenciamento de tarefas de exemplo' },
    ],
  }

  if (swaggerBaseUrl) {
    openapiConfig.servers = [
      {
        url: swaggerBaseUrl,
        description: swaggerServerDescription,
      },
    ]
  }

  await app.register(swagger, {
    mode: 'dynamic',
    openapi: openapiConfig,
  })

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  })
}

export const swaggerPlugin = fp(plugin, {
  name: 'swagger-plugin',
})
