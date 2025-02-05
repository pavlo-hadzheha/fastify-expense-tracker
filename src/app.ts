import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { userRoutes } from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

const app = Fastify({ logger: true }) // you can disable logging

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

app.register(userRoutes, { prefix: 'api/users' })
for (let schema of [...userSchemas]) {
  app.addSchema(schema)
}

async function main() {
  await app.listen({
    port: 8000,
    host: '0.0.0.0',
  })
}

main()
