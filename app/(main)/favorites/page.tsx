import { db } from '@/app/lib/prisma'
import RestaurantItem from '../components/restaurant-item'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <div className="m-auto xl:max-w-[1224px]">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold xl:mt-4">
          Restaurantes Favoritos
        </h2>
        <div className="flex w-full flex-col gap-6 xl:flex-row xl:flex-wrap xl:gap-5">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="max-w-full gap-6"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não marcou nenhum restaurante como favorito.
            </h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyFavoriteRestaurants
