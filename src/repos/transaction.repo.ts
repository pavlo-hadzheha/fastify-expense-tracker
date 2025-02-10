import { PrismaClient } from '@prisma/client'
import { Transaction } from '../types/TransactionSchema'

export type ITransactionRepo = {
  create(body: Omit<Transaction, 'id' | 'userId' | 'timestamp'>, userId: string): Promise<Transaction>
  delete(id: string): Promise<Transaction>
  getByUserId(userId: string): Promise<Transaction[]>
  getById(id: string): Promise<Transaction | null>
}

export function getTransactionRepo(db: PrismaClient): ITransactionRepo {
  return {
    create(body, userId) {
      return db.transaction.create({
        data: {
          ...body,
          userId,
        },
      })
    },
    async getByUserId(_userId) {
      return db.transaction.findMany({
        where: {
          userId: _userId,
        },
      })
    },
    getById(id) {
      return db.transaction.findUnique({
        where: {
          id: id,
        },
      })
    },
    async delete(id) {
      return db.transaction.delete({
        where: {
          id,
        },
      })
    },
  }
}
