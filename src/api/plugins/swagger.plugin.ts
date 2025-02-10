import fSwagger from '@fastify/swagger'
import fSwaggerUI from '@fastify/swagger-ui'

import { HttpErrorSchema } from '@/types/HttpErrorSchema'
import { AccountSchema } from '@/types/AccountSchema'
import { TransactionSchema } from '@/types/TransactionSchema'
import { FastifyPluginAsync } from 'fastify'
import { createJsonSchemaTransformObject, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifyPlugin from 'fastify-plugin'

const plugin: FastifyPluginAsync = async function (server) {
  server.register(fSwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'ExpenseTracker',
        description: 'Save your transactions in remote DB',
        version: '1.0.0',
      },
      components: {
        schemas: {},
      },
    },
    transform: jsonSchemaTransform,
    transformObject: createJsonSchemaTransformObject({
      schemas: {
        AccountSchema,
        TransactionSchema,
        HttpErrorSchema,
      },
    }),
  })

  server.register(fSwaggerUI, { routePrefix: '/documentation' })
}

export default fastifyPlugin(plugin, {
  fastify: '5.x',
  name: 'swagger-plugin',
})
