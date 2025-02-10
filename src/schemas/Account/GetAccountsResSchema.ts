import { AccountSchema } from '@/types/AccountSchema'
import z from 'zod'

export const GetAccountsResSchema = z.array(AccountSchema)