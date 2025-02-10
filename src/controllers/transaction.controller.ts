import z from 'zod'
import { ITransactionRepo } from '@/repos/transaction.repo'
import { CreateTransactionReqSchema } from '@/schemas/Transaction/CreateTransactionReqSchema'
import { HttpError } from '@/types/errors/HttpError'

export async function getTransactions(transactionRepo: ITransactionRepo, userId: string) {
  return transactionRepo.getByUserId(userId)
}

export async function getTransaction(transactionRepo: ITransactionRepo, id: string) {
  const transaction = await transactionRepo.getById(id)
  if (!transaction) throw new HttpError(404, 'Not found')
  return transaction
}

export async function createTransaction(
  transactionRepo: ITransactionRepo,
  body: z.infer<typeof CreateTransactionReqSchema>,
  userId: string
) {
  return transactionRepo.create(body, userId)
}

export async function deleteTransaction(transactionRepo: ITransactionRepo, id: string) {
  try {
    return await transactionRepo.delete(id)
  } catch {
    throw new HttpError(404, `Not Found`)
  }
}
