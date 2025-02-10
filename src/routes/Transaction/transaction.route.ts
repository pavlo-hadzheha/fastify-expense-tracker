import { FastifyInstance } from 'fastify'

import { ProblemDetailsSchema } from '../../types/ProblemDetailsSchema'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetTransactionsResSchema } from './schemas/GetTransactionsResSchema'
import { GetTransactionReqSchema } from './schemas/GetTransactionReqSchema'
import { CreateTransactionReqSchema } from './schemas/CreateTransactionReqSchema'
import { GetTransactionResSchema } from './schemas/GetTransactionResSchema'
import { DeleteTransactionReqSchema } from './schemas/DeleteTrasactionReqSchema'
import { DeleteTransactionResSchema } from './schemas/DeleteTransactionResSchema'
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
} from '../../controllers/transaction.controller'

export default function transactionRoutes(_server: FastifyInstance) {
  const server = _server.withTypeProvider<ZodTypeProvider>()

  server.addHook('preHandler', server.authenticate)

  server.route({
    url: '/',
    method: 'GET',
    schema: {
      response: {
        200: GetTransactionsResSchema,
      },
    },
    handler: getTransactions,
  })

  server.get(
    '/:id',
    {
      schema: {
        params: GetTransactionReqSchema,
        response: {
          200: GetTransactionsResSchema,
          404: ProblemDetailsSchema,
        },
      },
    },
    getTransaction
  )

  server.post(
    '/',
    {
      schema: {
        body: CreateTransactionReqSchema,
        response: {
          201: GetTransactionResSchema,
        },
      },
    },
    createTransaction
  )

  server.delete(
    '/:id',
    {
      schema: {
        params: DeleteTransactionReqSchema,
        response: {
          200: DeleteTransactionResSchema,
          404: ProblemDetailsSchema,
        },
      },
    },
    deleteTransaction
  )

  _server.log.info('transaction routes registered')
}
