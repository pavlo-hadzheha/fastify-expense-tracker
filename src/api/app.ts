import '@/services/env.service'

import Fastify from 'fastify'

import autoload from '@fastify/autoload'
import fCookie from '@fastify/cookie'
import fCors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import path from 'path'
import { getRepos } from '../repos'
import { PrismaClient } from '@prisma/client'
import swaggerPlugin from './plugins/swagger.plugin'
import autoTaggingPlugin from './plugins/auto-tagging.plugin'

const app = Fastify({ logger: true })

app.register(fCors, { origin: '*' })

app.register(autoTaggingPlugin)

app.register(swaggerPlugin)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// cookies
app.register(fCookie, { secret: 'some-secret-key', hook: 'preHandler' })

// db
app.decorate('db', new PrismaClient())

// repos
app.decorate('repos', getRepos(app.db))

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
})

app.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: {
    prefix: '/api',
  },
  autoHooks: true,
  cascadeHooks: true,
  routeParams: true,
})

async function main() {
  await app.listen({
    port: 8000,
    host: '0.0.0.0',
  })
}
main()
