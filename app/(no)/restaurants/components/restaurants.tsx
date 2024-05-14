'use client'

import { Restaurant } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RestaurantItem from '@/app/(main)/components/restaurant-item'
import { searchForRestaurants } from '@/app/actions/search'

const Restaurants = () => {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get('search')

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  return (
    <>
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
          {!searchFor && (
            <h3 className="text-sm text-muted-foreground">
              Digite o nome de algum restaurante para pesquisar
            </h3>
          )}
        </div>
      </div>
    </>
  )
}

export default Restaurants
