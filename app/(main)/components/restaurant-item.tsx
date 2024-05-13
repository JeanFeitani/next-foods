import { Restaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import { formatCurrency } from '@/app/lib/price'
import { cn } from '@/app/lib/utils'

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  const desktop = true

  return (
    <Link
      className={cn(
        'min-w-[266px] max-w-[266px] xl:min-w-[381px] xl:max-w-[381px]',
        className,
      )}
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full xl:h-[165px]">
          <Image
            src={restaurant.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={restaurant.name}
          />
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary bg-white px-2.5 py-1">
            <StarIcon
              size={desktop ? 16 : 12}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-xs font-semibold xl:text-sm">5.0</span>
          </div>
          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 xl:h-10 xl:w-10"
          >
            <HeartIcon className="h-4 w-4 fill-white text-base xl:h-[22px] xl:w-[22px]" />
          </Button>
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
    </Link>
  )
}

export default RestaurantItem
