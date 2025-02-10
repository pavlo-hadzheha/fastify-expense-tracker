import z from 'zod'

export class ProblemDetails extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message)
  }
}

export const ProblemDetailsSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
})
