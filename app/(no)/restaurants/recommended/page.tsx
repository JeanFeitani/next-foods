import RestaurantItem from '@/app/(main)/components/restaurant-item'
import { authOptions } from '@/app/lib/auth'
import { db } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany()
  const session = await getServerSession(authOptions)

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  })
  return (
    <div className="m-auto xl:max-w-[1224px]">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold xl:mt-4">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 xl:flex-row xl:flex-wrap xl:gap-5">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              className="max-w-full gap-6"
              key={restaurant.id}
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecommendedRestaurants
