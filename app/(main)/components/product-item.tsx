import { Prisma } from '@prisma/client'
import Image from 'next/image'
import { ArrowDownIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/app/lib/utils'
import { calculateProductTotalPrice, formatCurrency } from '@/app/lib/price'

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
  className?: string
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn('min-w-[150px] xl:min-w-[180px]', className)}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        <div className="relative  aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>
        <div>
          <h2 className="truncate text-sm xl:text-base">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold xl:text-lg">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through xl:text-sm">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>
          <span className="block text-xs text-muted-foreground xl:text-sm">
            {product.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
