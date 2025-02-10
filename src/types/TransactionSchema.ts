import z from 'zod'

export const TransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  timestamp: z.date(),
  mcc: z.number(),
  amount: z.number({ coerce: true }),
  currencyCode: z.number(),
  comment: z.string().nullish(),
})

export type Transaction = z.infer<typeof TransactionSchema>
