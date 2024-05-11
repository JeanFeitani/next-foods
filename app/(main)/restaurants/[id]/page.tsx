import { db } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import RestaurantImage from '../components/restaurant-image'
import RestaurantDetails from '../components/restaurant-details'
import CartBanner from '../components/cart-banner'

interface RestaurantsPageProps {
  params: {
    id: string
  }
}

const RestaurantsPage = async ({ params: { id } }: RestaurantsPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
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

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <RestaurantDetails restaurant={restaurant} />

      <CartBanner restaurant={restaurant}></CartBanner>
    </div>
  )
}

export default RestaurantsPage
