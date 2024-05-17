'use client'

import DeliveryInfo from '@/app/(main)/components/delivery-info'
import ProductsList from '@/app/(main)/components/products-list'
import { Prisma } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: {
        include: {
          products: true
        }
      }
    }
  }>
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5 xl:mt-0">
      <div className="flex items-center justify-between px-5 xl:hidden">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8 ">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="left-2 top-2 flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white xl:hidden">
          <StarIcon size={12} className=" fill-yellow-400  text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="mt-6 px-5 xl:hidden">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 xl:hidden [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
            key={category.id}
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4 xl:px-5">
          <h2 className="px-5 font-semibold xl:px-0">{category.name}</h2>
          {/* @ts-expect-error ___ */}
          <ProductsList soft products={category.products} />
        </div>
      ))}
    </div>
  )
}

export default RestaurantDetails
