import RestaurantItem from '@/app/(main)/components/restaurant-item'
import { db } from '@/app/lib/prisma'

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany()

  return (
    <div className="m-auto xl:max-w-[1224px]">
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold xl:mt-4">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6 xl:flex-row xl:flex-wrap xl:gap-5">
          {restaurants.map((restarurant) => (
            <RestaurantItem
              className="max-w-full gap-6"
              key={restarurant.id}
              restaurant={restarurant}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecommendedRestaurants
