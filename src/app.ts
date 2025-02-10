import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { userRoutes } from './modules/user/user.route'
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import fCors from '@fastify/cors'
import fSwagger from '@fastify/swagger'
import fSwaggerUI from '@fastify/swagger-ui'
import autoTaggingPlugin from './plugins/auto-tagging.plugin'
import { transactionRoutes } from './modules/transaction/transaction.route'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const app = Fastify({ logger: true })

app.register(fSwagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'ExpenseTracker',
      description: 'Save your transactions in remote DB',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
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

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// cookies
app.register(fCookie, { secret: 'some-secret-key', hook: 'preHandler' })

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

// ROUTES
app.register(userRoutes, { prefix: 'api/Account' })
app.register(transactionRoutes, { prefix: 'api/Transaction' })

async function main() {
  await app.listen({
    port: 8000,
    host: '0.0.0.0',
  })
}
main()
