import z from 'zod'
import { GetTransactionResSchema } from './GetTransactionResSchema'

export const GetTransactionsResSchema = z.array(GetTransactionResSchema)
