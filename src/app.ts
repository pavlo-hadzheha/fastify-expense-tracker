import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { userRoutes } from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import fCors from '@fastify/cors'
import fSwagger from '@fastify/swagger'
import fSwaggerUI from '@fastify/swagger-ui'
import autoTaggingPlugin from './plugins/auto-tagging.plugin'
import { transactionRoutes } from './modules/transaction/transaction.route'
import { transactionSchemas } from './modules/transaction/transaction.schema'
import { generalSchemas } from './types/ProblemDetailsSchema'

const app = Fastify({ logger: true })

app.register(fSwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'ExpenseTracker',
      description: 'Save your transactions in remote DB',
      version: '1.0.0',
    },
    // security: [{ cookieAuth: [] }],
    // components: {
    //   securitySchemes: {
    //     cookieAuth: {
    //       description: 'Cookie header token, sample: "access_token={TOKEN}"',
    //       type: 'apiKey',
    //       name: 'access_token',
    //       in: 'cookie',
    //     },
    //   },
    // },
  },
})

app.register(fSwaggerUI, { routePrefix: '/documentation' })

app.register(fCors, { origin: '*' })

app.register(autoTaggingPlugin)

// jwt
app.register(fjwt, { secret: 'supersecretcode-CHANGE_THIS-USE_ENV_FILE' })
app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt
  return next()
})
app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
  const token = req.cookies.access_token
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' })
  }
  // here decoded will be a different type by default but we want it to be of user-payload type
  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  req.user = decoded
})

// cookies
app.register(fCookie, {
  secret: 'some-secret-key',
  hook: 'preHandler',
})
app.get('/healthcheck', (req, res) => {
  res.send({ message: 'Success' })
})

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
})

app.register(userRoutes, { prefix: 'api/Account' })
userSchemas.forEach((schema) => app.addSchema(schema))

app.register(transactionRoutes, { prefix: 'api/Transaction' })
transactionSchemas.forEach((schema) => app.addSchema(schema))

generalSchemas.forEach((schema) => app.addSchema(schema))

async function main() {
  await app.listen({
    port: 8000,
    host: '0.0.0.0',
  })
}
main()
