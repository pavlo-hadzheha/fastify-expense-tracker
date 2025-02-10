import z from 'zod'

export const AccountSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})
