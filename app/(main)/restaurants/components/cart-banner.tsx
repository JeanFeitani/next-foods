'use client'

import { formatCurrency } from '@/app/lib/price'
import { CartContext } from '@/app/providers/context/cart-context'
import { Restaurant } from '@prisma/client'
import { useContext, useState } from 'react'
import Cart from '../../components/cart'
import { Button } from '../../components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../components/ui/sheet'

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const { products, totalPrice, totalQuantity } = useContext(CartContext)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  )

  if (!restaurantHasProductsOnCart) return null

  return (
    <div className="sticky bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{' '}
            <span className="text-xs font-normal text-muted-foreground">
              {' '}
              / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
            </span>
          </h3>
        </div>
        <Button onClick={() => setIsCartOpen(true)}>Ver sacola</Button>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>

            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default CartBanner