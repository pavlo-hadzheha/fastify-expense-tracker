import z from 'zod'

import { AccountSchema } from '../../../types/AccountSchema'

export const GetAccountsResSchema = z.array(AccountSchema)
