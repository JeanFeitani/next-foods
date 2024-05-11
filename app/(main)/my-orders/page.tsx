import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Header from '../components/header'
import OrderItem from './components/order-item'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/prisma'

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}

export default MyOrdersPage
