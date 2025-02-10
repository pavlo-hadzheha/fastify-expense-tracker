import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetAccountsResSchema } from './schemas/GetAccountsResSchema'
import { CreateAccountReqSchema } from './schemas/CreateAccountReqSchema'
import { CreateAccountResSchema } from './schemas/CreateAccountResSchema'
import { LoginReqSchema } from './schemas/LoginReqSchema'
import { LoginResSchema } from './schemas/LoginResSchema'
import { createUser, getUsers, login, logout } from '../../controllers/user.controller'

export default function userRoutes(_server: FastifyInstance) {
  const server = _server.withTypeProvider<ZodTypeProvider>()

  server.get(
    '/',
    {
      schema: {
        response: {
          200: GetAccountsResSchema,
        },
      },
    },
    getUsers
  )

  server.route({
    url: '/register',
    method: 'POST',
    schema: {
      body: CreateAccountReqSchema,
      response: {
        201: CreateAccountResSchema,
      },
    },
    handler: createUser,
  })

  server.post(
    '/login',
    {
      schema: {
        body: LoginReqSchema,
        response: {
          201: LoginResSchema,
        },
      },
    },
    login
  )

  server.delete('/logout', { preHandler: [server.authenticate] }, logout)

  server.log.info('user routes registered')
}
