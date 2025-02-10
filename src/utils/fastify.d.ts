import { JWT } from '@fastify/jwt'
import { PrismaClient } from '@prisma/client'
import { IRepos } from '../repos'

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    db: PrismaClient
    repos: IRepos
  }
}

type UserPayload = {
  id: string
  email: string
  name: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}
