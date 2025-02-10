import z from "zod";

export const LoginResSchema = z.object({
  accessToken: z.string(),
})