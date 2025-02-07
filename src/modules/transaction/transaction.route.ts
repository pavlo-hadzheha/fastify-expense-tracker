import { FastifyInstance } from 'fastify'
import { $ref } from './transaction.schema'
import { createTransaction, deleteTransaction, getTransaction, getTransactions } from './transaction.controller'
import { $generalSchemasRef } from '../../types/ProblemDetailsSchema'

export function transactionRoutes(_server: FastifyInstance) {
  _server.addHook('preHandler', _server.authenticate)

  _server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('getTransactionsResponseSchema'),
        },
      },
    },
    getTransactions
  )

  _server.get(
    '/:id',
    {
      schema: {
        params: $ref('getTransactionSchema'),
        response: {
          200: $ref('getTransactionResponseSchema'),
          404: $generalSchemasRef('problemDetailsSchema'),
        },
      },
    },
    getTransaction
  )

  _server.post(
    '/',
    {
      schema: {
        body: $ref('createTransactionSchema'),
        response: {
          201: $ref('getTransactionResponseSchema'),
        },
      },
    },
    createTransaction
  )

  _server.delete(
    '/:id',
    {
      schema: {
        params: $ref('deleteTransactionSchema'),
        response: {
          200: $ref('deleteTransactionResponseSchema'),
          404: $generalSchemasRef('problemDetailsSchema'),
        },
      },
    },
    deleteTransaction
  )
}
