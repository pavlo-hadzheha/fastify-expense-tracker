import { buildJsonSchemas } from 'fastify-zod'
import z from 'zod'

const createTransactionSchema = z.object({
  mcc: z.number(),
  amount: z.number(),
  currencyCode: z.number(),
  comment: z.string().optional(),
})

const getTransactionSchema = z.object({
  id: z.string(),
})

const getTransactionResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  timestamp: z.date(),
  mcc: z.number(),
  amount: z.number(),
  currencyCode: z.number(),
  comment: z.string().optional(),
})

const getTransactionsResponseSchema = z.array(getTransactionResponseSchema)

const deleteTransactionSchema = z.object({
  id: z.string(),
})

const deleteTransactionResponseSchema = z.boolean()

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
export type GetTransactionResponse = z.infer<typeof getTransactionResponseSchema>
export type GetTransactionsResponse = z.infer<typeof getTransactionsResponseSchema>
export type GetTransactionParams = z.infer<typeof getTransactionSchema>
export type DeleteTransactionInput = z.infer<typeof deleteTransactionSchema>

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas(
  {
    createTransactionSchema,
    getTransactionResponseSchema,
    getTransactionsResponseSchema,
    deleteTransactionSchema,
    getTransactionSchema,
    deleteTransactionResponseSchema,
  },
  { $id: 'TransactionSchemas' }
)
