import { PrismaClient } from '@prisma/client'
import { getAccountRepo } from './account.repo'
import { getTransactionRepo } from './transaction.repo'

export function getRepos(db: PrismaClient) {
  return {
    accountRepo: getAccountRepo(db),
    transactionRepo: getTransactionRepo(db),
  }
}

export type IRepos = ReturnType<typeof getRepos>
