import { authHook } from '@/api/hooks/auth.hook'
import { createAccount, getAccounts, login } from '@/controllers/account.controller'
import { CreateAccountReqSchema } from '@/schemas/Account/CreateAccountReqSchema'
import { CreateAccountResSchema } from '@/schemas/Account/CreateAccountResSchema'
import { GetAccountsResSchema } from '@/schemas/Account/GetAccountsResSchema'
import { LoginReqSchema } from '@/schemas/Account/LoginReqSchema'
import { LoginResSchema } from '@/schemas/Account/LoginResSchema'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default function userRoutes(_server: FastifyInstance) {
  const server = _server.withTypeProvider<ZodTypeProvider>()

  const { accountRepo } = server.repos

  server.route({
    url: '/',
    method: 'GET',
    schema: {
      response: {
        200: GetAccountsResSchema,
      },
    },
    handler: () => getAccounts(accountRepo),
  })

  server.route({
    url: '/register',
    method: 'POST',
    schema: {
      body: CreateAccountReqSchema,
      response: {
        201: CreateAccountResSchema,
      },
    },
    handler: (req, res) => {
      return createAccount(accountRepo, req.body)
    },
  })

  server.route({
    url: '/login',
    method: 'POST',
    schema: {
      body: LoginReqSchema,
      response: {
        201: LoginResSchema,
      },
    },
    handler: async (req, reply) => {
      const payload = await login(accountRepo, req.body)
      const token = req.jwt.sign(payload)
      reply.setCookie('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
      return { accessToken: token }
    },
  })

  server.route({
    url: '/logout',
    method: 'DELETE',
    preHandler: authHook,
    handler: async function logout(req, reply) {
      reply.clearCookie('access_token')
    },
  })

  server.log.info('user routes registered')
}
