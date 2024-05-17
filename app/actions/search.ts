'use server'

import { db } from '@/app/lib/prisma'

export const searchForRestaurants = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return restaurants
}

export const getUserFavoriteRestaurants = async (userId: string) => {
  const UserFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId },
  })

  return UserFavoriteRestaurants
}
