import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
} from '@/controllers/transaction.controller'
import { CreateTransactionReqSchema } from '@/schemas/Transaction/CreateTransactionReqSchema'
import { CreateTransactionResSchema } from '@/schemas/Transaction/CreateTransactionResSchema'
import { DeleteTransactionResSchema } from '@/schemas/Transaction/DeleteTransactionResSchema'
import { DeleteTransactionReqSchema } from '@/schemas/Transaction/DeleteTrasactionReqSchema'
import { GetTransactionReqSchema } from '@/schemas/Transaction/GetTransactionReqSchema'
import { GetTransactionResSchema } from '@/schemas/Transaction/GetTransactionResSchema'
import { GetTransactionsResSchema } from '@/schemas/Transaction/GetTransactionsResSchema'
import { HttpErrorSchema } from '@/types/HttpErrorSchema'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default function transactionRoutes(_server: FastifyInstance) {
  const server = _server.withTypeProvider<ZodTypeProvider>()

  const transactionRepo = server.repos.transactionRepo

  server.route({
    url: '/',
    method: 'GET',
    schema: {
      response: {
        200: GetTransactionsResSchema,
      },
    },
    handler: async (req) => {
      const transactions = await getTransactions(transactionRepo, req.user.id)
      return GetTransactionsResSchema.parse(transactions)
    },
  })

  server.route({
    url: '/:id',
    method: 'GET',
    schema: {
      params: GetTransactionReqSchema,
      response: {
        200: GetTransactionResSchema,
        404: HttpErrorSchema,
      },
    },
    handler: async (req, reply) => {
      const transaction = await getTransaction(transactionRepo, req.params.id)

      return GetTransactionResSchema.parse(transaction)
    },
  })

  server.route({
    url: '/',
    method: 'POST',
    schema: {
      body: CreateTransactionReqSchema,
      response: {
        201: CreateTransactionResSchema,
      },
    },
    handler: async (req, reply) => {
      const newTransaction = await createTransaction(transactionRepo, req.body, req.user.id)
      return reply.code(201).send(newTransaction)
    },
  })

  server.route({
    url: '/:id',
    method: 'DELETE',
    schema: {
      params: DeleteTransactionReqSchema,
      response: {
        200: DeleteTransactionResSchema,
        404: HttpErrorSchema,
      },
    },
    handler: async (req) => {
      const deletedTransaction = await deleteTransaction(transactionRepo, req.params.id)
      return DeleteTransactionResSchema.parse(deletedTransaction)
    },
  })

  _server.log.info('transaction routes registered')
}
