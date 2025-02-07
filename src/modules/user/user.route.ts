import { FastifyInstance, FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify'
import { $ref } from './user.schema'
import { createUser, getUsers, login, logout } from './user.controller'

export function userRoutes(_server: FastifyInstance) {
  //add prehandler to the root route
  _server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('getUsersSchema'),
        },
      },
      // preHandler: _server.authenticate,
    },
    getUsers
  )

  _server.post(
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

  _server.post(
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

  _server.delete('/logout', { preHandler: [_server.authenticate] }, logout)

  _server.log.info('user routes registered')
}
