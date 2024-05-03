import RestaurantItem from '@/app/components/restaurant-item'
import { db } from '@/app/lib/prisma'

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany()

  return (
    <div>
      {restaurants.map((restarurant) => (
        <RestaurantItem key={restarurant.id} restaurant={restarurant} />
      ))}
    </div>
  )
}

export default RecommendedRestaurants
