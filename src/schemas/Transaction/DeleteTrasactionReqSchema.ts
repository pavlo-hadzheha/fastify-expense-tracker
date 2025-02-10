import z from 'zod'

export const DeleteTransactionReqSchema = z.object({
  id: z.string(),
})
