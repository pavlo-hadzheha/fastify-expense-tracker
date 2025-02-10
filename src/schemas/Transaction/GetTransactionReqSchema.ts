import z from 'zod'

export const GetTransactionReqSchema = z.object({
  id: z.string(),
})
