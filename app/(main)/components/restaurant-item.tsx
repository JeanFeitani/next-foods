'use client'

import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { formatCurrency } from '@/app/lib/price'
import { cn } from '@/app/lib/utils'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { toggleFavoriteRestaurant } from '@/app/actions/favorite-restaurant'

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession()

  const isFavorite = userFavoriteRestaurants.some(
    (fav) => fav.restaurantId === restaurant.id,
  )

  const handleFavoriteClick = async () => {
    if (!data?.user.id) return
    try {
      await toggleFavoriteRestaurant(data?.user.id, restaurant.id)
      toast.success(
        isFavorite
          ? 'Restaurante removido dos favoritos.'
          : 'Restaurante favoritado.',
      )
    } catch (error) {
      toast.error('Erro ao favoritar restaurante.')
    }
  }

  return (
    <div
      className={cn(
        'min-w-[266px] max-w-[266px] xl:min-w-[381px] xl:max-w-[381px]',
        className,
      )}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full xl:h-[165px]">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />
          </Link>
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2.5 py-1">
            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400 xl:h-4 xl:w-4" />
            <span className="text-xs font-semibold xl:text-sm">5.0</span>
          </div>
          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 xl:h-10 xl:w-10 ${isFavorite ? 'bg-red-600' : ''}`}
            >
              <HeartIcon
                className="h-4 w-4 fill-white text-base xl:h-[22px] xl:w-[22px]"
                onClick={handleFavoriteClick}
              />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold xl:text-base">
            {restaurant.name}
          </h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground xl:text-sm">
                {Number(restaurant.deliveryFee) === 0
                  ? 'Entrega grátis'
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantItem
