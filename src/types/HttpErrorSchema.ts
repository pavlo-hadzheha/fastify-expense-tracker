import z from 'zod'

export const HttpErrorSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
})
