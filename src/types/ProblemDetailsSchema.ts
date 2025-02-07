import { buildJsonSchemas } from 'fastify-zod'
import z from 'zod'

export class ProblemDetails extends Error {
  constructor(readonly statusCode: number, readonly message: string) {
    super(message)
  }
}

export const problemDetailsSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
})

export const { schemas: generalSchemas, $ref: $generalSchemasRef } = buildJsonSchemas(
  {
    problemDetailsSchema: problemDetailsSchema,
  },
  { $id: 'GeneralSchemas' }
)
