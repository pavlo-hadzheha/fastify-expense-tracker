import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from './user.schema'
import { createUser, getUsers, login, logout } from './user.controller'

const registerUserOpts = {
  schema: {
    body: $ref('createUserSchema'),
    response: {
      201: $ref('createUserResponseSchema'),
    },
  },
}

const loginUserOpts = {
  schema: {
    body: $ref('loginSchema'),
    response: {
      201: $ref('loginResponseSchema'),
    },
  },
}

export async function userRoutes(app: FastifyInstance) {
  //add prehandler to the root route
  app.get(
    '/',
    {
      preHandler: [app.authenticate],
    },
    getUsers
  )

  app.post('/register', registerUserOpts, createUser)

  app.post('/login', loginUserOpts, login)

  app.delete('/logout',{ preHandler: [app.authenticate] }, logout)

  app.log.info('user routes registered')
}
