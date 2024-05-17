'use client'

import { Restaurant } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import RestaurantItem from '@/app/(main)/components/restaurant-item'
import { searchForRestaurants } from '@/app/actions/search'
import Header from '@/app/(main)/components/header'
import Search from '@/app/(main)/components/search'

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
      <div className="m-auto xl:max-w-[1224px]">
        <div className="xl:hidden">
          <Header />
          <div className="mt-3 px-5">
            <Search />
          </div>
        </div>
        <div className="px-5 py-6">
          <h2 className="mb-6 text-lg font-semibold xl:mt-4">
            {!searchFor || restaurants.length === 0
              ? 'Nenhum restaurante encontrado'
              : `Resultados para ${searchFor}`}
          </h2>
          {!searchFor && (
            <h3 className="text-sm text-muted-foreground">
              Digite o nome de algum restaurante para pesquisar
            </h3>
          )}
          <div className="flex w-full flex-col gap-6 xl:flex-row xl:flex-wrap xl:gap-5">
            {restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Restaurants
