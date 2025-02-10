import z from 'zod'
import { AccountSchema } from '../../../types/AccountSchema'

export const CreateAccountReqSchema = z.object({
  ...AccountSchema.shape,
  password: z.string().min(6),
})
