import { FastifyReply, FastifyRequest } from 'fastify'
import { ProblemDetails } from '../types/ProblemDetailsSchema'
import prisma from '../utils/prisma'
import z from 'zod'
import { GetTransactionReqSchema } from '../routes/Transaction/schemas/GetTransactionReqSchema'
import { CreateTransactionReqSchema } from '../routes/Transaction/schemas/CreateTransactionReqSchema'
import { DeleteTransactionReqSchema } from '../routes/Transaction/schemas/DeleteTrasactionReqSchema'

export async function getTransactions(req: FastifyRequest, reply: FastifyReply) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: req.user.id,
    },
  })
  transactions.forEach((_t) => {
    console.log({ type: _t.amount })
  })

  return reply.code(200).send(transactions)
}

export async function getTransaction(
  req: FastifyRequest<{
    Params: z.infer<typeof GetTransactionReqSchema>
  }>,
  reply: FastifyReply
) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: req.params.id,
    },
  })
  if (!transaction) return reply.code(404).send(new ProblemDetails(404, 'Not found'))

  return reply.code(200).send(transaction)
}

export async function createTransaction(
  req: FastifyRequest<{
    Body: z.infer<typeof CreateTransactionReqSchema>
  }>,
  reply: FastifyReply
) {
  const transaction = await prisma.transaction.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  })
  return reply.code(201).send(transaction)
}

export async function deleteTransaction(
  req: FastifyRequest<{
    Params: z.infer<typeof DeleteTransactionReqSchema>
  }>,
  reply: FastifyReply
) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!transaction) return reply.code(404).send(new ProblemDetails(404, 'Not found'))

  await prisma.transaction.delete({
    where: {
      id: req.params.id,
    },
  })

  return reply.code(200).send(true)
}
