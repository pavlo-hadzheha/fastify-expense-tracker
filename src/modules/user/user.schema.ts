import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string(),
})

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

const getUsersSchema = z.array(createUserResponseSchema)

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginSchema>

// to build our JSON schema, we use buildJsonSchemas from fastify-zod
// it returns all the schemas to register and a ref to refer these schemas
export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    getUsersSchema,
    loginSchema,
    loginResponseSchema,
  },
  { $id: 'AccountSchemas' }
)
