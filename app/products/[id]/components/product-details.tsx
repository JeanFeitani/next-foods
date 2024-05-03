'use client'

import DiscountBadge from '@/app/components/discount-badge'
import ProductList from '@/app/components/products-list'
import { Button } from '@/app/components/ui/button'
import { calculateProductTotalPrice, formatCurrency } from '@/app/lib/price'
import { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1)
  const handleDecreaseQuantityClick = () =>
    setQuantity((prev) => {
      if (prev === 1) return 1
      return prev - 1
    })

  return (
    <div className="py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6 ">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            onClick={handleDecreaseQuantityClick}
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button onClick={handleIncreaseQuantityClick} size="icon">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="mt-6 px-5">
        <div className="flex justify-around rounded-sm border py-3">
          <div className="text-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Entrega</span>
              <BikeIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <strong className="text-sm font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </strong>
            ) : (
              <strong className="text-sm font-semibold">Grátis</strong>
            )}
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>Entrega</span>
              <TimerIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <strong className="text-sm font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryTimeMinutes))}
              </strong>
            ) : (
              <strong className="text-sm font-semibold">Grátis</strong>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>

        <ProductList products={complementaryProducts} />
      </div>
    </div>
  )
}

export default ProductDetails
