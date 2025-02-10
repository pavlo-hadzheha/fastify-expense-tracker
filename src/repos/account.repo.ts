import { HttpError } from '@/types/errors/HttpError'
import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export type IAccountRepo = {
  getAll(): Promise<Omit<User, 'password'>[]>
  create(newUser: Omit<User, 'id'>): Promise<Omit<User, 'password'>>
  getByEmail(email: string): Promise<User | null>
}

export function getAccountRepo(db: PrismaClient): IAccountRepo {
  return {
    async getAll() {
      const res = await db.user.findMany({
        select: {
          name: true,
          id: true,
          email: true,
        },
      })
      return res
    },

    async create(newUser) {
      const { password, email, name } = newUser
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      })
      if (user) {
        throw new HttpError(409, 'User with such email already exists')
      }
      const hash = await bcrypt.hash(password, SALT_ROUNDS)
      return db.user.create({
        data: {
          password: hash,
          email,
          name,
        },
      })
    },

    getByEmail(email) {
      return db.user.findUnique({ where: { email } })
    },
  }
}
