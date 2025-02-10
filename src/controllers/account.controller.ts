import { IAccountRepo } from '@/repos/account.repo'
import { CreateAccountReqSchema } from '@/schemas/Account/CreateAccountReqSchema'
import { LoginReqSchema } from '@/schemas/Account/LoginReqSchema'
import z from 'zod'
import bcrypt from 'bcrypt'
import { HttpError } from '@/types/errors/HttpError'

export async function getAccounts(accountRepo: IAccountRepo) {
  return accountRepo.getAll()
}

export async function createAccount(accountRepo: IAccountRepo, body: z.infer<typeof CreateAccountReqSchema>) {
  return accountRepo.create(body)
}

export async function login(accountRepo: IAccountRepo, body: z.infer<typeof LoginReqSchema>) {
  const { email, password } = body
  const user = await accountRepo.getByEmail(email)

  const isMatch = user && (await bcrypt.compare(password, user.password))

  if (!isMatch) {
    throw new HttpError(401, 'Invalid email or password')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  }
}
