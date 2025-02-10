import { AccountSchema } from '@/types/AccountSchema'
import z from 'zod'

export const CreateAccountReqSchema = z.object({
  ...AccountSchema.omit({ id: true }).shape,
  password: z.string().min(6),
})
