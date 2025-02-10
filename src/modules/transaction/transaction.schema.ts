import z from 'zod'

export const createTransactionSchema = z.object({
  mcc: z.number(),
  amount: z.number(),
  currencyCode: z.number(),
  comment: z.string().optional(),
})

export const getTransactionSchema = z.object({
  id: z.string(),
})

export const getTransactionResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  timestamp: z.date(),
  mcc: z.number(),
  amount: z.number({ coerce: true }),
  currencyCode: z.number(),
  comment: z.string().optional(),
})

export const getTransactionsResponseSchema = z.array(getTransactionResponseSchema)

export const deleteTransactionSchema = z.object({
  id: z.string(),
})

export const deleteTransactionResponseSchema = z.boolean()

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
export type GetTransactionResponse = z.infer<typeof getTransactionResponseSchema>
export type GetTransactionsResponse = z.infer<typeof getTransactionsResponseSchema>
export type GetTransactionParams = z.infer<typeof getTransactionSchema>
export type DeleteTransactionInput = z.infer<typeof deleteTransactionSchema>
