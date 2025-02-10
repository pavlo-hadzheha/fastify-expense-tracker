import z from 'zod'

export const CreateTransactionReqSchema = z.object({
  mcc: z.number(),
  amount: z.number(),
  currencyCode: z.number(),
  comment: z.string().optional(),
})
