import { FastifyInstance } from 'fastify'
import {
  createUserResponseSchema,
  createUserSchema,
  getUsersSchema,
  loginResponseSchema,
  loginSchema,
} from './user.schema'
import { createUser, getUsers, login, logout } from './user.controller'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export function userRoutes(_server: FastifyInstance) {
  // const _server = _server.withTypeProvider<ZodTypeProvider>()

  _server.get(
    '/',
    {
      schema: {
        response: {
          200: getUsersSchema,
        },
      },
    },
    getUsers
  )

  _server.route({
    url: '/register',
    method: 'POST',
    schema: {
      body: createUserSchema,
      response: {
        201: createUserResponseSchema,
      },
    },
    handler: createUser,
  })

  _server.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          201: loginResponseSchema,
        },
      },
    },
    login
  )

  _server.delete('/logout', { preHandler: [_server.authenticate] }, logout)

  _server.log.info('user routes registered')
}
