import { HttpError } from '@/types/errors/HttpError'
import { FastifyJWT } from '@fastify/jwt'
import { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from 'fastify'

export const authHook: preHandlerAsyncHookHandler = async (req, reply) => {
  const token = req.cookies.access_token
  if (!token) {
    throw new HttpError(401, 'Authentication required')
  }
  // here decoded will be a different type by default but we want it to be of user-payload type
  try {
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
  } catch (err) {
    throw new HttpError(401, 'Authentication error')
  }
}
