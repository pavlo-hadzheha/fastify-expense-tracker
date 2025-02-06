import { FastifyInstance, FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify'
import { $ref } from './user.schema'
import { createUser, getUsers, login, logout } from './user.controller'

export async function userRoutes(app: FastifyInstance) {
  //add prehandler to the root route
  app.get(
    '/',
    {
      preHandler: app.authenticate,
    },
    getUsers
  )

  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser
  )

  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login
  )

  app.delete('/logout', { preHandler: [app.authenticate] }, logout)

  app.log.info('user routes registered')
}
