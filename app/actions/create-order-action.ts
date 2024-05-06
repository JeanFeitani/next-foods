'use server'

import { Prisma } from '@prisma/client'
import { db } from '../lib/prisma'

export const createOrderAction = async (data: Prisma.OrderCreateInput) => {
  return await db.order.create({ data })
}
