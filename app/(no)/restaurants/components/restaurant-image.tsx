'use client'

import { Button } from '@/app/(main)/components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[215px] w-full xl:h-[380px] xl:w-[750px]">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="object-cover xl:rounded-md"
        fill
        quality={100}
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white xl:hidden"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size="icon"
        className="absolute right-4 top-4 rounded-full  bg-gray-700 xl:hidden"
      >
        <HeartIcon size={20} className="fill-white xl:hidden" />
      </Button>
    </div>
  )
}

export default RestaurantImage
