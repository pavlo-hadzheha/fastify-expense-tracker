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
  const server = _server.withTypeProvider<ZodTypeProvider>()

  server.get(
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

  server.post(
    '/register',
    {
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    createUser
  )

  server.post(
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

  server.delete('/logout', { preHandler: [server.authenticate] }, logout)

  server.log.info('user routes registered')
}
