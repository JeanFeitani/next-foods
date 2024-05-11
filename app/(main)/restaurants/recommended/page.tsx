import RestaurantItem from '@/app/(main)/components/restaurant-item'
import { db } from '@/app/lib/prisma'

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany()

  return (
    <div>
      {restaurants.map((restarurant) => (
        <RestaurantItem
          className="flex max-w-full flex-col gap-6 px-5"
          key={restarurant.id}
          restaurant={restarurant}
        />
      ))}
    </div>
  )
}

export default RecommendedRestaurants
