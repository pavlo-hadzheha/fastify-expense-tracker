import { FastifyInstance } from 'fastify'
import {
  createTransactionSchema,
  deleteTransactionResponseSchema,
  deleteTransactionSchema,
  getTransactionResponseSchema,
  getTransactionSchema,
  getTransactionsResponseSchema,
} from './transaction.schema'
import { createTransaction, deleteTransaction, getTransaction, getTransactions } from './transaction.controller'
import { problemDetailsSchema } from '../../types/ProblemDetailsSchema'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export function transactionRoutes(_server: FastifyInstance) {
  const server = _server.withTypeProvider<ZodTypeProvider>()

  server.addHook('preHandler', server.authenticate)

  server.addHook('onError', (request, reply, error, done) => {
    // Some code
    console.log({ error })
    done()
  })

  server.route({
    url: '/',
    method: 'GET',
    schema: {
      response: {
        200: getTransactionsResponseSchema,
      },
    },
    handler: getTransactions,
  })

  server.get(
    '/:id',
    {
      schema: {
        params: getTransactionSchema,
        response: {
          200: getTransactionResponseSchema,
          404: problemDetailsSchema,
        },
      },
    },
    getTransaction
  )

  server.post(
    '/',
    {
      schema: {
        body: createTransactionSchema,
        response: {
          201: getTransactionResponseSchema,
        },
      },
    },
    createTransaction
  )

  server.delete(
    '/:id',
    {
      schema: {
        params: deleteTransactionSchema,
        response: {
          200: deleteTransactionResponseSchema,
          404: problemDetailsSchema,
        },
      },
    },
    deleteTransaction
  )

  _server.log.info('transaction routes registered')
}
