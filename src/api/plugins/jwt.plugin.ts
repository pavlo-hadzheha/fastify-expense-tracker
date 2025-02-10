import '@/services/env.service'
import { FastifyPluginAsync } from 'fastify'
import fjwt  from '@fastify/jwt'
import fastifyPlugin from 'fastify-plugin'

const plugin: FastifyPluginAsync = async function (server) {
  server.register(fjwt, { secret: process.env.JWT_SECRET || '' })

  server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    return next()
  })
}

export default fastifyPlugin(plugin, {
  fastify: '5.x',
  name: 'jwt-plugin',
})
