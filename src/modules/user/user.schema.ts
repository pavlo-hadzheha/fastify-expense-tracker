import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  name: z.string(),
})

export const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
})

export const getUsersSchema = z.array(createUserResponseSchema)

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string().min(6),
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginSchema>
