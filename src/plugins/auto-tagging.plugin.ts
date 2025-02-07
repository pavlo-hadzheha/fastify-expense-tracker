import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

const plugin: FastifyPluginAsync = async function (fastify) {
  fastify.addHook('onRoute', (routeOptions) => {
    if (routeOptions.url) {
      // If no match is found, try to match `/api/{tag}/...`
      const pathMatch = routeOptions.url.match(/^\/api\/([^\/]+)/)

      // Use the first capturing group as the tag, or 'default' if no matches are found
      const tag = pathMatch ? pathMatch[1] : 'default'

      // Add or modify the existing tags
      if (!routeOptions.schema) {
        // eslint-disable-next-line no-param-reassign
        routeOptions.schema = {}
      }

      const existingTags = routeOptions.schema.tags || []
      // eslint-disable-next-line no-param-reassign
      routeOptions.schema.tags = [...existingTags, tag]
    }
  })
}

export default fp(plugin, '5.x')
