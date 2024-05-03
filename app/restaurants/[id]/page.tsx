import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import RestaurantImage from './components/restaurant-image'
import RestaurantDetails from './components/restaurant-details'

interface RestaurantsPageProps {
  params: {
    id: string
  }
}

const RestaurantsPage = async ({ params: { id } }: RestaurantsPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: true,
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) {
    return notFound()
  }

  const complementaryProducts = await db.product.findMany({
    where: {
      category: { name: 'Comida Japonesa' },
    },
    include: { restaurant: true },
  })

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <RestaurantDetails
        restaurant={restaurant}
        complementaryProducts={complementaryProducts}
      />
    </div>
  )
}

export default RestaurantsPage
